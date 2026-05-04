import { computed, ref, watch } from 'vue'

export interface TreasuredMusic {
  id: string
  song_name: string
  author_name: string
  audio: string
  cover: string
  lrc: string
}

/** 顺序 | 列表循环 | 单曲循环 | 随机 */
export type PlayMode = 'sequence' | 'list' | 'single' | 'shuffle'

export const playModeLabels: Record<PlayMode, string> = {
  sequence: '顺序播放',
  list: '列表循环',
  single: '单曲循环',
  shuffle: '随机播放',
}

const playlist = ref<TreasuredMusic[]>([])
const currentIndex = ref(0)
const playMode = ref<PlayMode>('sequence')
const volume = ref(0.85)
const muted = ref(false)
const isPlaying = ref(false)
const currentTime = ref(0)
const duration = ref(0)
const playlistPanelOpen = ref(false)

/** 播放器面板是否展开（收起后可通过浮动按钮再展开） */
const playerBarExpanded = ref(true)

/** 用户是否已开始播放过一次（未开始时底部不展示播放器，避免空壳占位） */
const playbackEngaged = ref(false)

let audio: HTMLAudioElement | null = null

function playlistSignature(list: TreasuredMusic[]): string {
  return list.map((t) => t.id).join('\u0001')
}

function ensureAudio(): HTMLAudioElement | null {
  if (typeof window === 'undefined') return null
  if (!audio) {
    audio = new Audio()
    audio.preload = 'metadata'
    audio.volume = muted.value ? 0 : volume.value
    audio.addEventListener('timeupdate', () => {
      if (audio) currentTime.value = audio.currentTime
    })
    audio.addEventListener('loadedmetadata', () => {
      if (audio) duration.value = Number.isFinite(audio.duration) ? audio.duration : 0
    })
    audio.addEventListener('durationchange', () => {
      if (audio) duration.value = Number.isFinite(audio.duration) ? audio.duration : 0
    })
    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('play', () => {
      isPlaying.value = true
    })
    audio.addEventListener('pause', () => {
      isPlaying.value = false
    })
    audio.addEventListener('playing', () => {
      playbackEngaged.value = true
    })
  }
  return audio
}

watch(volume, (v) => {
  const a = audio
  if (a) a.volume = muted.value ? 0 : v
})

watch(muted, (m) => {
  const a = audio
  if (a) a.volume = m ? 0 : volume.value
})

function handleEnded() {
  const list = playlist.value
  const len = list.length
  if (!len) return

  const mode = playMode.value
  const idx = currentIndex.value

  if (mode === 'single') {
    const a = ensureAudio()
    if (a) {
      a.currentTime = 0
      a.play().catch(() => {})
    }
    return
  }

  if (mode === 'shuffle') {
    if (len === 1) {
      playAt(0)
      return
    }
    let next = Math.floor(Math.random() * len)
    while (next === idx) next = Math.floor(Math.random() * len)
    playAt(next)
    return
  }

  if (mode === 'list') {
    playAt((idx + 1) % len)
    return
  }

  if (idx < len - 1) {
    playAt(idx + 1)
  } else {
    isPlaying.value = false
  }
}

function loadTrack(index: number) {
  const list = playlist.value
  const a = ensureAudio()
  if (!a || !list.length) return

  const idx = Math.max(0, Math.min(index, list.length - 1))
  currentIndex.value = idx
  const track = list[idx]
  if (!track?.audio) return

  a.src = track.audio
  a.load()
  currentTime.value = 0
}

export async function playAt(index: number) {
  const list = playlist.value
  if (!list.length) return
  const idx = Math.max(0, Math.min(index, list.length - 1))
  loadTrack(idx)
  const a = ensureAudio()
  if (!a) return
  try {
    await a.play()
  } catch {
    isPlaying.value = false
  }
}

export async function togglePlay() {
  const list = playlist.value
  const a = ensureAudio()
  if (!a || !list.length) return

  if (!a.currentSrc) {
    await playAt(currentIndex.value)
    return
  }

  if (isPlaying.value) {
    a.pause()
  } else {
    try {
      await a.play()
    } catch {
      isPlaying.value = false
    }
  }
}

export function seekByRatio(ratio: number) {
  const a = ensureAudio()
  if (!a || !duration.value) return
  const t = Math.max(0, Math.min(1, ratio)) * duration.value
  a.currentTime = t
  currentTime.value = t
}

export function nextTrack() {
  const list = playlist.value
  const len = list.length
  if (!len) return
  const idx = currentIndex.value
  const mode = playMode.value

  if (mode === 'shuffle') {
    if (len === 1) {
      playAt(0)
      return
    }
    let n = Math.floor(Math.random() * len)
    while (n === idx) n = Math.floor(Math.random() * len)
    playAt(n)
    return
  }

  if (mode === 'list') {
    playAt((idx + 1) % len)
    return
  }

  if (idx < len - 1) playAt(idx + 1)
}

export function prevTrack() {
  const list = playlist.value
  const len = list.length
  if (!len) return
  const idx = currentIndex.value
  const a = ensureAudio()

  if (a && a.currentTime > 3) {
    a.currentTime = 0
    currentTime.value = 0
    return
  }

  if (playMode.value === 'shuffle') {
    if (len === 1) {
      playAt(0)
      return
    }
    let n = Math.floor(Math.random() * len)
    while (n === idx) n = Math.floor(Math.random() * len)
    playAt(n)
    return
  }

  if (playMode.value === 'list') {
    playAt((idx - 1 + len) % len)
    return
  }

  if (idx > 0) playAt(idx - 1)
}

const modeCycle: PlayMode[] = ['sequence', 'list', 'single', 'shuffle']

export function cyclePlayMode() {
  const i = modeCycle.indexOf(playMode.value)
  playMode.value = modeCycle[(i + 1) % modeCycle.length]
}

export function setPlaylist(list: TreasuredMusic[], startIndex = 0) {
  const next = list.slice()

  if (!next.length) {
    playlist.value = []
    currentIndex.value = 0
    const a = ensureAudio()
    if (a) {
      a.pause()
      a.removeAttribute('src')
      isPlaying.value = false
    }
    return
  }

  // 与当前队列曲目一致时不再 loadTrack，避免换页回到音乐页后重置曲目与播放状态
  if (
    playlist.value.length === next.length &&
    playlistSignature(playlist.value) === playlistSignature(next)
  ) {
    return
  }

  playlist.value = next
  currentIndex.value = Math.min(Math.max(0, startIndex), playlist.value.length - 1)
  loadTrack(currentIndex.value)
}

export function togglePlayerBarExpanded() {
  playerBarExpanded.value = !playerBarExpanded.value
  if (!playerBarExpanded.value) playlistPanelOpen.value = false
}

export function toggleMuted() {
  muted.value = !muted.value
}

export function togglePlaylistPanel() {
  playlistPanelOpen.value = !playlistPanelOpen.value
}

export function useTreasuredMusicPlayer() {
  const currentTrack = computed(() => {
    const list = playlist.value
    const i = currentIndex.value
    if (!list.length || i < 0 || i >= list.length) return null
    return list[i] ?? null
  })

  const hasPlaylist = computed(() => playlist.value.length > 0)

  const progress = computed(() =>
    duration.value > 0 ? currentTime.value / duration.value : 0,
  )

  return {
    playlist,
    currentIndex,
    currentTrack,
    hasPlaylist,
    playMode,
    playModeLabels,
    volume,
    muted,
    isPlaying,
    currentTime,
    duration,
    progress,
    playlistPanelOpen,
    playerBarExpanded,
    playbackEngaged,
    playAt,
    togglePlay,
    nextTrack,
    prevTrack,
    cyclePlayMode,
    setPlaylist,
    seekByRatio,
    toggleMuted,
    togglePlaylistPanel,
    togglePlayerBarExpanded,
    ensureAudio,
  }
}
