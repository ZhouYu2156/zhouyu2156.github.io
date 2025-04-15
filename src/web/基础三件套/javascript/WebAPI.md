# 常用 Web API

## 电池
> 推荐：[前往MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/BatteryManager)
> 
> `navigator.getBattery()` 提供有关系统电池电量的信息。
>
> 事件
> 
> - `chargingchange`：当电池充电状态（charging 属性）更新时触发。
> - `chargingtimechange`：当电池充电时间（chargingTime 属性）更新时触发。
> - `dischargingtimechange`：当电池续航时间（dischargingTime 属性）更新时触发。
> - `levelchange`：当电池电量（level 属性）更新时触发。

::: code-group

```ts [电池信息]
navigator.getBattery().then((battery) => {
  // 返回一个 BatteryManager 对象
  console.log("battery 对象信息: ", battery);
  battery.addEventListener("chargingchange", () => {
    // 1、监听电池充电状态变化的事件: charging属性的布尔值代表了充电的状态
    console.log("电池是否在充电?", battery.charging ? "是" : "否");
  });
  battery.addEventListener("levelchange", () => {
    // 2、监听电池电量是否变化事件: level属性的值表示剩余电量百分比
    console.log(`电池电量：${battery.level * 100}%`);
  });
  battery.addEventListener("chargingtimechange", () => {
    // 3、监听电池充电时间是否变化事件: chargingTime属性的值表示剩余充电时间
    console.log(`电池充电时间：${battery.chargingTime}秒`);
  });
  battery.addEventListener("dischargingtimechange", () => {
    // 4、监听电池放电时间是否变化事件: dischargingTime属性的值表示剩余放电(续航)时间
    console.log(`电池续航时间：${battery.dischargingTime}秒`);
  });
});
```

:::


## 广播频道(对讲机)
::: tip
> 推荐：[前往官网](https://developer.mozilla.org/zh-CN/docs/Web/API/Broadcast_Channel_API)
> 
> `BroadcastChannel` 可以在`同一个源内的所有窗口和选项卡之间进行通信`。这意味着，可以像一个电话一样，在多个窗口之间进行通信。大家都可以在这个频道内收发消息。
:::

::: code-group

```vue [对讲机1]
<script setup lang='ts'>
import { ref } from 'vue'
const sendMsg = () => {
    phone1.postMessage("hello")
}
const phone1 = new BroadcastChannel("talk")
phone1.onmessage = (event) => {
    console.log("phone1 on message: ", event);
}
</script>

<template>
    <div>
        <button @click="sendMsg">Phone1 Call</button>
    </div>
</template>

<style scoped lang='css'>

</style>
```

```vue [对讲机2]
<script setup lang='ts'>
import { ref } from 'vue'
const sendMsg = () => {
    phone2.postMessage("hello")
}
const phone2 = new BroadcastChannel("talk")
phone2.onmessage = (event) => {
    console.log("phone2 on message: ", event);
}
</script>

<template>
    <div>
        <button @click="sendMsg">Phone2 Call</button>
    </div>
</template>

<style scoped lang='css'>

</style>

```

:::


## 剪贴板
> 参考: [MDN官网](https://developer.mozilla.org/zh-CN/docs/Web/API/Clipboard)
> 
> - Clipboard 接口的 `writeText(data)` 方法可以将内容写入到操作系统的剪贴板。该方法返回一个`promise对象`,可以在`promise对象`的`then`方法当中指定剪贴板写入成功(或失败)后的回调函数。
> 
> - Clipboard 接口的 `readText()` 方法获取系统剪贴板的文本内容返回一个包含剪贴板内容的Promise对象。
>
> - 如果要剪贴非文本的数据，比如文件或图片等，可以使用它的`read()`和`write()`方法。上面这两种是专门用来剪贴文本数据的

::: code-group

```vue [剪贴板]
<script setup lang="ts">
import { ref } from 'vue';

const content = ref('')

const copy = () => {
  /**复制内容到剪贴板 */
  navigator.clipboard.writeText(content.value)
  content.value = '';
  console.log("复制成功!");
}
const paste = async () => {
  /**粘贴剪贴板的内容, readText 返回的是一个带着剪贴板数据的 Promise 对象, 可以通过 await/then 获取结果 */
  let result = await (navigator.clipboard as Clipboard).readText()
  console.log("你粘贴的内容: ", result);
}
</script>

<template>
  <div>
      <input type="text" v-model="content">
      <button @click="copy">复制到到剪贴板</button>
      <button @click="paste">从剪贴板粘贴</button>
    </div>
</template>

```

:::


## 查看设备内存
> 推荐：[前往MDN官网](https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator/deviceMemory)
> 
> - 通过`navigator.deviceMemory`可以查看设备内存大小。

::: code-group

```vue [查看设备内存大小]
<script setup lang="ts">
const checkMemory = () => {
  const memory = navigator.deviceMemory;
  console.log(`此设备至少拥有 ${memory}GiB 的 RAM。`);
}
</script>

<template>
  <div>
    <button @click="checkMemory">查看设备内存</button>
  </div>
</template>

<style scoped></style>

```
:::


## 广告 & 通知

> 利用 `WebAPI` 接口的能力，可以制造`PC`端的桌面通知。

```javascript
async function useNotification() {
	/** 请求设备权限 */
	const permission = await Notification.requestPermission()
	/** 允许情况下, 创建通知 */
	if (permission === 'granted') {
		const notify = new Notification('极客兔 - 笔记站', {
			image: 'https://img1.baidu.com/it/u=3981774678,804382988&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto', // 广告图片链接
			icon: 'https://www.zhouyu2156.cn/pineapple-logo.svg',
			body: '一心创作优质内容',
			lang: 'zh-CN',  // 语言
			dir: 'auto', // 文字方向
			badge: 'https://www.zhouyu2156.cn/pineapple-logo.svg',
			vibrate: [200, 100, 200], // 震动(如果设备支持的话)
			silent: false, // 静默
			requireInteraction: false, // 要求交互
		})
		/** 用户点击通知事件 */
		notify.onclick = () => {
			window.open('https://www.zhouyu2156.cn/')
		}
	}
}

useNotification()
```

## 文档对象
::: tip
> 推荐： [前往MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Document_Object_Model)
>
> - DOM 使用逻辑树的形式来表示文档。树的每个分支末端都是一个节点，每个节点都包含对象。DOM 方法允许以编程方式来访问树。借助这些方法，你可以改变文档的结构、样式或内容。
>
> - 节点还可以附加事件处理器。一旦事件被触发，相应的事件处理器就会被执行。

:::

## 切换全屏

> 推荐： [前往MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Fullscreen_API)
> 
> 几个关键的API
> 
> - `document.fullscreen (过时)` 判断当前窗口是否进入全屏，返回布尔值。
> - 通过`document.fullscreenElement`属性来判断是否有元素进入全屏，如果还没有元素进入全屏，那么`document.fullscreenElement`的值是 `null`，已经有元素进入全屏，那么该属性的值就是`进入全屏的元素及其所有子元素`。
> - 通过 `<Element>.requestFullscreen()`方法设置普通元素进入全屏。
> - 通过`document.documentElement.requestFullscreen()`设置文档对象元素进入全屏。
> - 通过`document.exitFullscreen()`方法退出全屏。不论普通元素还是文档对象元素都使用该方法退出全屏。
> - 了解更多关于元素切换全屏的监听事件详情可以看官网。


::: code-group

```vue [进入/退出全屏]
<script setup lang="ts">

const toggleScreen = (el: any) => {
  // 这种方式选定元素进入全屏可能存在问题，因为如果绑定事件的元素内部还有子元素，那么获取到的 target 可能是绑定事件的内部元素，而不是我们实际绑定事件的元素，自然进入全屏的元素也就不是我们预期选定的元素了，此时我们一定要确切地引用要进入全屏的元素，对其进行操作。
  const btn = ((<any>el).target) as HTMLButtonElement;
  if (!document.fullscreenElement) {
    // 如果还没有进入全屏，那么 button 元素请求进入全屏
    btn.requestFullscreen();
    // document.documentElement.requestFullscreen();    // 整个文档进入全屏
  } else {
    // 退出全屏
    document.exitFullscreen()
  }
}

</script>

<template>
  <div>
    <button @click="toggleScreen">切换全屏</button>
  </div>
</template>

```

:::





实时音视频通信



![WebRTC架构图](/pictures/JavaScript/WebRTC架构图.png)



![WebRTC结构图](/pictures/JavaScript/WebRTC结构图.png)