#!/usr/bin/env bash
#
# 交互式提交：校验 Conventional Commits 风格的提交说明后，暂存并提交工作区，可选推送远端。
# 依赖：git、bash 4+（Windows 可使用 Git Bash）
#

set -euo pipefail

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
BOLD='\033[1m'
DIM='\033[2m'
NC='\033[0m'

die() {
  echo -e "${RED}✗${NC} $*" >&2
  exit 1
}

info() {
  echo -e "${BLUE}▶${NC} $*"
}

ok() {
  echo -e "${GREEN}✓${NC} $*"
}

warn() {
  echo -e "${YELLOW}!${NC} $*"
}

# 首行必须符合常见 Conventional Commits：<type>[(scope)][!]: <subject>
# 允许的类型与常见规范一致；冒号后允许 0 或多个空格（避免 feat:中文 被误判）；subject 至少一个非空白字符
is_valid_commit_message() {
  local first_line="$1"
  # 去掉可能的 Windows 回车
  first_line="${first_line//$'\r'/}"
  local pattern='^(feat|fix|docs|style|refactor|perf|test|chore|ci|build|revert)(\([a-zA-Z0-9._/-]+\))?(!)?:[[:space:]]*[^[:space:]].*$'
  [[ "$first_line" =~ $pattern ]]
}

print_rule_hint() {
  echo -e "${DIM}  合法示例：${NC}"
  echo -e "${DIM}    feat: 添加用户登录${NC} ${DIM}（冒号后建议空格；紧接中文亦可）${NC}"
  echo -e "${DIM}    fix(web): 修复首页样式错位${NC}"
  echo -e "${DIM}    docs: 更新 README 安装说明${NC}"
  echo -e "${DIM}  类型关键字：feat fix docs style refactor perf test chore ci build revert${NC}"
}

# 当前分支未设置上游时，用于首次 git push -u 的远端名（优先 githubware，其次 origin，再取任意一个）
resolve_default_remote() {
  if git remote get-url githubware &>/dev/null; then
    echo 'githubware'
    return
  fi
  if git remote get-url origin &>/dev/null; then
    echo 'origin'
    return
  fi
  git remote 2>/dev/null | head -n1
}

if ! command -v git >/dev/null 2>&1; then
  die "未找到 git，请先安装 Git 并加入 PATH。"
fi

if ! git rev-parse --git-dir >/dev/null 2>&1; then
  die "当前目录不是 Git 仓库，请在仓库根目录执行本脚本。"
fi

echo ""
echo -e "${BOLD}${CYAN}Git 自动提交${NC} ${DIM}(Conventional Commits)${NC}"
echo ""

commit_msg=""
while true; do
  read -r -p "$(echo -e "${CYAN}请输入提交信息${NC} ${DIM}(将以首行校验)${NC}: ")" commit_msg
  if [[ -z "${commit_msg//[[:space:]]/}" ]]; then
    warn "提交信息不能为空，请重新输入。"
    print_rule_hint
    echo ""
    continue
  fi
  # 仅取第一行参与规范校验（与 git 提交首行一致）
  first_line="${commit_msg%%$'\n'*}"
  first_line="${first_line//$'\r'/}"
  if is_valid_commit_message "$first_line"; then
    ok "提交信息格式校验通过。"
    break
  fi
  warn "提交信息不符合规范：须以类型关键字开头，例如 ${BOLD}feat:${NC}、${BOLD}fix:${NC} 等。"
  print_rule_hint
  echo ""
done

echo ""
info "正在暂存工作区所有变更（git add -A）…"
git add -A
ok "暂存完成。"

if git diff --cached --quiet; then
  warn "没有可提交的变更（工作区干净或无可暂存项）。"
  exit 0
fi

echo ""
info "正在提交…"
# -m 只取单行时丢多行，这里用 file 保留完整说明
commit_file="$(mktemp)"
printf '%s\n' "$commit_msg" >"$commit_file"
git commit -F "$commit_file"
rm -f "$commit_file"
ok "本地提交已完成。"

echo ""
current_branch="$(git symbolic-ref --short HEAD 2>/dev/null || echo "")"
if [[ -z "$current_branch" ]]; then
  warn "当前处于 detached HEAD，跳过推送。"
  exit 0
fi

read -r -p "$(echo -e "${CYAN}是否推送到远端仓库？${NC} ${DIM}[Y/n]${NC}: ")" push_yn
push_yn="${push_yn:-Y}"
if [[ "$push_yn" =~ ^[Yy]$ ]]; then
  upstream_remote="$(git config --get "branch.${current_branch}.remote" 2>/dev/null || true)"
  if [[ -n "$upstream_remote" ]]; then
    info "正在推送（上游: ${DIM}${upstream_remote}${NC}，分支: ${BOLD}${current_branch}${NC}）…"
    if git push; then
      ok "推送成功。"
    else
      warn "推送失败，请检查网络、SSH 或远端权限。可重试："
      echo -e "  ${DIM}git push${NC}"
      exit 1
    fi
  else
    push_remote="$(resolve_default_remote)"
    if [[ -z "$push_remote" ]]; then
      die "未配置 branch.${current_branch}.merge 且仓库中没有任何 remote，请先执行 git remote add …"
    fi
    info "当前分支尚未设置上游；将使用远端 ${BOLD}${push_remote}${NC} 并建立跟踪（分支: ${BOLD}${current_branch}${NC}）…"
    if git push -u "$push_remote" "$current_branch"; then
      ok "推送成功（已设置上游 ${push_remote}/${current_branch}）。"
    else
      warn "推送失败。请检查 SSH、远端是否存在同名分支，或手动执行："
      echo -e "  ${DIM}git push -u ${push_remote} ${current_branch}${NC}"
      exit 1
    fi
  fi
else
  info "已跳过推送。需要时可手动执行: ${DIM}git push${NC}"
fi

echo ""
ok "全部完成。"
echo ""
