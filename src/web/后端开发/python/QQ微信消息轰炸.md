# 消息轰炸

## 安装依赖

```bash
$ pip install pyautogui
```


## 程序启动

```python
python message.py
```

## 源代码

```python
import time

import pyautogui
import pyperclip

def send_message(message, interval=1):
    pyperclip.copy(message)
    pyautogui.hotkey('ctrl', 'v')
    pyautogui.press('enter')
    time.sleep(interval)


def bomber(file_path='./messages.txt'):
    """
    在微信、QQ等聊天软件进行消息轰炸
    """
    time.sleep(3)
    with open(file_path, 'r', encoding='utf-8') as fp:
        for line in fp:
            line = line.strip('\n')
            if not line:
                continue
            send_message(line)


if __name__ == '__main__':
    bomber()
```

- 项目代码: [访问我的github仓库](https://github.com/ZhouYu2156/Practical-Project)
