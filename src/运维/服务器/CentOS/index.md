# Linux 笔记

![Linux学习笔记](/pictures/linux云计算/linux_cover.jpg)

## 命令查询网站

> - [x] 命令查询网站：[点击跳转到该网站](https://www.lzltool.com/LinuxCommand)

## 单元五、磁盘管理

> **一定要注意关联上下文信息进行阅读、操作**

> 推荐几个在主机上方便操作 Linux 服务器的软件：`XShell` 、 `WindTerm` 、 `FinalShell`

### 一、磁盘分区

> fdisk 命令中的参数及其作用

| 参数 | 作用                           |
| ---- | ------------------------------ |
| m    | 查看全部可用的参数（帮忙信息） |
| n    | 添加新的分区                   |
| d    | 删除某个分区信息               |
| l    | 列出所有可用的分区类型         |
| t    | 改变某个分区的类型             |
| p    | 查看分区信息                   |
| w    | 保存并退出                     |
| q    | 不保存直接退出                 |

#### 1、添加磁盘分区

> 这一步操作，相当于把实际硬盘设备变成 linux 中的类似 window 上的某个盘符，之后我们就可以在此盘符里面存放东西啦

> 插入磁盘成功后，ls /dev 查看新添加的磁盘叫什么

> 找到磁盘名称后，对其进行操作

```bash
$ fdisk /dev/nvme0n2	# fdisk是交互式命令，这里进入交互界面
```

> 进入交互命令行，对其分区进行配置

```bash
$ >n		# 开始分区
$ >p		# 查看分区详细信息
$ >w		# 此时配置是在内存中保存着，需要写入文件保存，并退出
```

#### 2、查看磁盘分区设备文件

> 查看设备文件的属性

```bash
$ file /dev/nvme0n2p1	# 查看主分区1设备文件信息
$ partprobe		# 如果系统还没有自动把分区信息同步给Linux内核
$ partprobe 	# 通过这个命令手动同步分区信息到内核，推荐连续两次
```

#### 3、格式化分区

> 不格式化磁盘的话，系统不知道怎么写入数据，所以格式化就是把该段磁盘中的内容全部清空，系统会重置写入数据的起始位置，并用指定的文件系统对其进行规划。

```bash
$ mkfs.xfs /dev/nvme0n2p1
$ mkfs -t ext4	-c	/dev/md0
```

#### 4、挂载分区

> 将这个分区挂载到我们的系统中。Linux 中，万物皆文件，所以挂载分区到我们的系统中就是相当于 window 上多了一个盘符的概念。之后可以在该盘符中创建内容了。

```bash
$ mkdir /mysite		# 创建一个目录
$ mount /dev/nvme0n2p1 /mysite		# 将我们创建的目录挂载到这次磁盘分区上，以后写入这个文件中的内容就都存储在这个分区上啦，这里是将目录与磁盘分区进行关联的操作
$ df -h			# 查看磁盘使用情况，会列出磁盘使用率等详细信息
```

**mount 命令中的参数及其作用**

> 该命令是对临时插入的磁盘文件进行挂载并能够立即挂在完成进行使用，一旦重启后就失效了。需要重新对我们的文件夹目录与之关联。

| 参数 | 作用                                   |
| ---- | -------------------------------------- |
| -a   | 挂载所有在 /etc/fstab 中定义的文件系统 |
| -t   | 指定文件系统的类型                     |

**编辑 => /etc/fstab 自动挂载分区**

> mount 是临时挂载临时使用，每次重启开机了就需要重新挂载，显然不方便
>
> 这里介绍的就是修改 『系统配置文件』来使目录与挂载点一直关联，就算重启了也不要再进行挂载操作。这就方便使用多了。

> 该文件中的字段有『设备文件 挂载目录 格式类型 权限选项 是否备份 是否自检』

**用于挂载信息的指定填写格式中，各字段所表示的含义**

| 字段     | 意义                                                                     |
| -------- | ------------------------------------------------------------------------ |
| 设备文件 | 一般为设备的路径+设备名称，也可以写唯一的识别码（UUID）                  |
| 挂载目录 | 指定要挂载到的目录，需在挂载前创建好                                     |
| 格式类型 | 指定文件系统的格式，比如 ext3、ext4、xfs、swap、iso9660                  |
| 权限选项 | 若设置为 defaults，则默认权限为 rw，suid，dev，exec，auto，nouser，async |
| 是否备份 | 若为 1 则开机后使用 dump 进行磁盘备份，为 0 则不备份                     |
| 是否自检 | 若为 1 则开机后自动进行磁盘自检，为 0 则不自检                           |

#### 5、卸载分区

> 挂载分区，就是将我们的文件目录与磁盘分区进行关联的动作；
>
> 卸载分区，就是将我们的文件目录与磁盘分区进行取消关联的动作，不再占用磁盘设备的资源。
>
> 卸载操作，只需要取消关联的一方即可。比如上面的磁盘分区 和 /mysite 进行的关联，我们只需要取消任意一方的关联，即可完成卸载的操作。

```bash
$ umount /mysite			# 第一种方式
$ umount /dev/nvme0n2p1		 # 第二种方式		这两种方式都行，任选其一
$ df -h 					# 此时，再查看磁盘使用情况，我们的 /mysite目录 和 /dev/nvme0n2p1就没有出现在我们的资源管理列表中啦，说明我们对此磁盘文件不再占用
```

#### 6、du 命令

> 用于查看文件数据占用量

```bash
$ cp -rf /etc/* /mysite/		# 将/etc/下面的所有文件复制到/mysite/中去
$ du -sh /mysite				# 查看文件数据存储占用容量
```

| 参数 | 作用                                                         |
| ---- | ------------------------------------------------------------ |
| -a   | 列出所有的文件与目录容量，因为默认仅统计目录底下的文件量而以 |
| -h   | 以人们较易阅读的容量格式（G/M）显示                          |
| -s   | 列出总量而以，而不列出每个各自的目录占用容量                 |
| -S   | 不包括子目录下的总计，与 -s 有点差别                         |
| -k   | 以 KBytes 列出容量显示                                       |
| -m   | 以 MBytes 列出容量显示                                       |

#### 7、df 命令

> 作用：列出文件系统的整体磁盘使用量

| 参数 | 作用                                                                     |
| ---- | ------------------------------------------------------------------------ |
| -a   | 列出所有的文件系统，包括系统特有的 /proc 等文件系统                      |
| -k   | 以 KBytes 的容量显示各文件系统                                           |
| -m   | 以 MBytes 的容量显示各文件系统                                           |
| -h   | 以人们较易阅读的 GBytes、MBytes、KBytes 等格式自行显示                   |
| -H   | 以 M=1000K 取代 M=1024K 的进位方式                                       |
| -T   | 显示文件系统类型，连同该 partition 的 filesystem 名称（例如 ext3）也列出 |
| -i   | 不用硬盘容量，而以 inode 的数量来显示                                    |

### 二、、磁盘容量配额

> 简单说明：规定一个文件夹所能占用的存储容量大小，当达到该容量大小时就不允许再往里面存放内容了。这种功能对磁盘空间分配给某些工作人员多少存储容量很有必要。这能够很好的管理、规划我们的存储设备资源。

#### **1、实验前的准备工作**

- 按照『磁盘分区』的知识，创建一个磁盘分区，并将一个目录挂载到这个磁盘分区上，并设置好自动挂载
- 之后需要 reboot 重启
- 重启之后，执行以下命令

```bash
$ mount | grep opt	# 看是否已经成功挂载并显示该文件系统的相关信息
```

- 添加用户并赋予该用户（没有给他添加分组，默认是其他用户）对目录文件具有『写』的权限

```bash
$ useradd tom
$ chmod -Rf o+w /opt
```

#### **2、xfs_quota 命令**

> xfs_quota 命令是一个专门针对 XFS 文件系统来管理 quota 磁盘容量配额服务而设计的命令，语法格式为：xfs_quota [参数] 配额 文件系统

> 其中 -c 参数用于以参数的形式设置要执行的命令；-x 参数是专家模式，让运维人员能够对 quota 服务进行更多复杂的配置

```bash
# 下面这段对 目录文件 /opt 进行 『软配额限制』 和 『硬配额限制』，最后指定是哪个运维用户人员
$ xfs_quota -x -c 'limit bsoft=3m bhard=6m isoft=3 ihard=6 tom' /opt
# 报错：xfs_quota: cannot set limits: Function not implemented
# 将 /etc/fstab 文件中的配置修改为如下内容 并 用命令 reboot 重启：
# 注意这是第二块分区了，前面磁盘分区演示的是 第一块分区
# /dev/nvme0n2p2                          /opt                    xfs     defaults,uquota   0 0
```

```bash
# 查看配额详情
$ xfs_quota -x -c report /opt
```

#### **3、edquota 命令**

> edquota 命令用于编辑用户的 quota 配额限制，语法格式：edquota [参数] [用户]

| 参数 | 作用                         |
| ---- | ---------------------------- |
| -u   | 表示要针对哪个用户进行设置   |
| -g   | 表示要针对哪个用户组进行设置 |

> edquota 会调用 vim 编辑器来让 root 管理员修改要限制的具体细节

```bash
$ edquota -u tom		# 对tom的配额进行编辑更改
```

### 三、磁盘阵列

> ① 具备前面的硬盘设备管理基础后，再来部署 RAID 和 LVM 就变得十分轻松了。
>
> ② 首先在虚拟机中添加 4 块硬盘设备来制作一个 RAID5 磁盘阵列。
>
> ③ 要关闭系统之后才能进行配置，否则可能会因为计算机架构的不同而导致虚拟机系统无法识别添加的硬盘设备。

> 『mdadm』命令用于管理 Linux 系统中的软件 RAID 硬盘阵列，
>
> 语法格式：mdadm [模式] <RAID 设备名称> [选项] [成员设备名称]

**mdadm 命令的常用参数及其作用**

| 参数 | 作用               |
| ---- | ------------------ |
| -a   | 检测设备名称       |
| -n   | 指定设备数量       |
| -x   | 空闲（备用）盘数量 |
| -l   | 指定 RAID 级别     |
| -C   | 创建               |
| -v   | 显示过程           |
| -f   | 模拟设备损坏       |
| -r   | 移除设备           |
| -Q   | 查看摘要信息       |
| -D   | 查看详细信息       |
| -S   | 停止 RAID 磁盘阵列 |

#### **1、创建 4 个磁盘分区**

> 按照磁盘分区的知识来即可，提示： fdisk [磁盘名]

#### **2、使用 mdadm 命令创建 RAID5**

```bash
$ mdadm --create /dev/md0	-l 5	-n	3	-x	1	/dev/nvme0n[3-6]p1
```

#### **3、为磁盘阵列卡建立文件系统**

```bash
$ mkfs -t ext4	-c	/dev/md0
```

#### **4、查看建立的 RAID5 的具体情况**

```bash
$ mdadm --detail /dev/md0
```

#### **5、将 RAID 设备挂载**

```bash
$ mkdir /RAID
$ mount /dev/md0 /RAID
$ df -h
```

#### **6、RAID 设备的数据恢复**

> 当 RAID 磁盘阵列中某一磁盘成员损坏后该如何处理呢？当发现磁盘阵列中有一块硬盘设备出现损坏而不能继续正常使用后，应当使用命令 mdadm 将其移除，然后查看 RAID 磁盘阵列的状态，可以发现状态已经改变。

> 这里我们模拟是 nvme0n4p1 损坏

**① 将损坏的 RAID 成员标记为失效**

```bash
$ mdadm /dev/md0 --fail /dev/nvme0n4p1
```

**② 移除失效的成员**

```bash
$ mdadm /dev/md0 --remove /dev/nvme0n4p1
```

**③ 更换硬盘设备，更换一个新的 RAID 成员**

```bash
mdadm /dev/md0 --add /dev/nvme0n7p1		# 之前的硬盘编号时 3-6，这是新添加的（7号）硬盘的第一分区加入磁盘阵列中来（这里作为演示，我就继续将之前移除的重新添加进来了）
```

### 四、LVM（逻辑卷管理器）

> 概念：新添加的两块硬盘设备本来毫无关联，但 Linux 中存在这样一种技术，能够让两块硬盘设备关联起来，像一块存储磁盘一样使用。单个的硬盘在该技术上的概念叫做物理卷，两块及两块以上的硬盘设备要关联起来的形式就叫做卷组，意思是合并成组当整体来使用，卷组的名称可以由用户自定义，将卷组看成一个整体，可以对它进行切割，切割出来的一部分就叫做逻辑卷。最后把这个逻辑卷设备格式化成 EXT4 文件系统后挂载使用。

**1、部署逻辑卷**

① 第一步：让新添加的两块硬盘设备支持 LVM 技术

```bash
$ pvcreate /dev/nvme0n7 /dev/nvme0n8
```

② 第二步：把两块硬盘设备加入 storage 卷组中，然后查看卷组的状态

```bash
$ vgcreate storage /dev/nvme0n7 /dev/nvme0n8
# vgcreate 卷组名	/dev/设备1	/dev/设备2
```

③ 第三步：切割出一个约为 150MB 的逻辑卷设备

> 切割单位有两种计量单位：第一种以容量为单位，所使用的参数为 -L 参数，例如 -L 150MB 生成一个大小为 150MB 的逻辑卷；
>
> 第二种是以基本单元的个数为单位，所使用的参数为 -l 。每个基本单元的大小默认为 4MB。例如 -l 37 可以生成一个大小为 37 × 4MB = 148MB 的逻辑卷组。

```bash
$ lvcreate -n vo -l 37 storage
```

```bash
# 创建完成后，可以查看逻辑卷的详细信息
$ lvdisplay
```

④ 第四步：把生成好的逻辑卷进行格式化，然后挂载使用

```bash
$ mkfs.ext4 /dev/storage/vo
```

```bash
$ mkdir /myTmp
$ mount /dev/storage/vo /myTmp
```

⑤ 第五步：查看挂载状态，并写入配置文件，使其永久生效

```bash
$ df -h
```

```bash
$ echo "/dev/storage/vo /myTmp ext4 defaults 0 0" >> /etc/fstab
```

#### **2、扩容逻辑卷**

> 卷组是由多块硬盘设备共同组成，用户在使用存储设备时感知不到设备底层的架构和布局，更不用关心底层是由多少块硬盘组成的，只要卷组中有足够的资源，就可以一直为逻辑卷扩容。扩展前请一定要记得卸载 设备和挂载点的 关联。

① 卸载设备和挂载点的关联，并把上一个实验中的逻辑卷 vo 扩展至 290MB

```bash
$ umount /myTmp
$ lvextend -L 290M /dev/storage/vo
```

② 检查硬盘完整性，并重置硬盘容量

```bash
$ e2fsck -f /dev/storage/vo		# 检查完整性
$ resize2fs /dev/storage/vo		# 重置硬盘容量
```

③ 重新挂载硬盘设备并查看挂载状态

```bash
$ mount -a		# 重新挂载 /etc/fstab  文件中提及的所有挂载点
$ df -h			# 查看挂载状态
```

#### **3、缩小逻辑卷**

> 相较于扩容逻辑卷，在对逻辑卷进行缩容操作时，其丢失数据的风险更大。所以一定要记得备份好数据。另外 Linux 系统规定，在对 LVM 逻辑卷进行缩容操作之前，首先检查文件系统的完整性（当然这也是为了保证我们的数据安全）。在执行缩容操作前记得先把文件系统卸载掉。

```bash
$ umount /myTmp
```

① 检查文件系统的完整性

```bash
$ e2fsck -f /dev/storage/vo		# 检查完整性
```

② 把逻辑卷 vo 的容量减小到 120MB

```bash
$ resize2fs /dev/storage/vo 120M			# 重置硬盘容量
$ lvreduce -L 120M /dev/storage/vo
```

③ 重新挂载文件系统并查看系统状态

```bash
$ mount -a		# 将 /etc/fstab里面的挂载内容全部执行一遍，让其挂载点重新生效
$ df -h			# 查看挂载状态
```

#### 4、逻辑卷快照

> LVM 具备『快照卷』 功能，功能类似虚拟机的快照功能。如果发现数据被改错了，就可以利用之前做好的快照卷进行还原覆盖。

> 快照卷功能有两个特点：
>
> ① 快照卷的容量必须等同于逻辑卷的容量。
>
> ② 快照卷仅一次有效，一旦执行还原操作后则会立即被自动删除。

**首先查看卷组信息**

```bash
$ vgdisplay
```

① 第一步：使用 -s 参数生成一个快照卷，使用 -L 参数指定切割的大小。另外还需要在命令后面写上是针对哪个逻辑卷执行的快照操作

```bash
$ lvcreate -L 120M -s -n SNAP /dev/storage/vo
$ lvdisplay
```

② 第二步：在逻辑卷所挂载的目录中创建一个 100MB 的垃圾文件，然后再查看快照卷的状态。可以发现存储空间的用量上升了。

```bash
$ vgdisplay
```

③ 第三步：为了校验 SNAP 快照卷的效果，需要对逻辑卷进行快照还原操作。在此之前记得先卸载掉逻辑卷设备与目录的挂载。

```bash
$ dd if=/dev/zero of=/myTmp/files bs=100M		# 制造100M的垃圾信息
$ lvdisplay		# 查看逻辑卷状态信息
```

④ 第四步：快照卷会被自动删除掉，并且刚刚在逻辑卷设备被执行快照操作后再创建出来的 100MB 的垃圾文件也被清除了

```bash
$ mount -a
$ ls /myTmp/
```

#### 5、删除逻辑卷

> 当生产环境中想要重新部署 LVM 或者不再需要使用 LVM 时，则需要执行 LVM 的删除操作。为此，需要提前备份好重要的数据信息，然后依次删除逻辑卷、卷组、物理卷设备，这个顺序不可颠倒！

① 第一步：取消逻辑卷与目录的挂载关联，删除配置文件中永久生效的设备参数

```bash
$ umount /myTmp
$ vim /etc/fstab		# 将对应的逻辑卷与目录挂载关联的数据行内容删除掉
```

② 第二步：删除逻辑卷设备，需要输入 y 来确认操作

```bash
$ lvremove /dev/storage/vo		# 需要进行确认操作，按y确认
```

③ 第三步：删除卷组，此处只写卷组名称即可，不需要设备的绝对路径

```bash
$ vgremove storage
```

④ 第四步：删除物理卷设备

```bash
$ pvremove /dev/nvme0n7 /dev/nvme0n8
```

> 再执行 lvdisplay、vgdisplay、pvdisplay 命令来查看 LVM 的信息时就不会再看到信息了（前提是以上步骤都是正确的）

## 单元六、软件包的安装与管理

### 1、RPM 软件包典型的命名格式

> 命名格式：软件名-版本号-释出号.体系号.rpm

### 2、URL 方式的命名方式

> （1）FTP 方式的命名格式
>
> ```txt
> 命名格式：ftp://[用户名 [:密码] @] 主机 [:端口]/包文件
> ```
>
> 用户安装这类 RPM 软件包，必须使用如下命令：
>
> ```bash
> $ rpm -ivh ftp://ftp.xxx.com/yyy.rpm
> # 或者
> $ rpm -ivh ftp://11.22.33.44:1100/pub/yyy.rpm
> ```
>
> （2）HTTP 方式的命名格式
>
> ```txt
> http://主机 [:端口]/包文件
> ```
>
> 用户安装这类 RPM 软件包，必须使用如下命令：
>
> ```bash
> $ rpm -ivh http://www.xxx.com/yyy.rpm
> ```

- 使用 RPM 安装软件

```bash
$ rpm -ivh xxx.rpm		# 下载某个网站资源中的 .rpm 包到当前路径下
```

- 使用 RPM 删除软件

```bash
$ rpm -e 软件名
# 如果使用 -e 选项时是不能删除的，那么就添加选项 --nodeps （不检查依赖关系）进行删除
$ $ rpm -e --nodeps 软件名
```

### 3、YUM 包管理器

> 在 Red Hat Enterprise Linux（RHEL 从 5.0 版本开始采用 YUM）、CentOS 和 Fedora 等发行版本中，采用了一种叫做 YUM 的软件包管理工具。YUM（Yellow dog Updater Modified）用 python 语言写成。YUM 的宗旨是收集 RPM 软件包的相关信息，检查依赖关系，自动化地升级、安装、删除 RPM 软件包。

> YUM 的 repository （仓库）可以是 http 或 ftp 站点，也可以是 本地软件池，但必须包含 RPM 的 header，header 包括了 RPM 包的各种信息，包括描述、功能、提供的文件、依赖性等。正是收集了这些 header 并加以分析，才能自动化地完成升级、安装软件包等任务。

#### （1）安装、删除软件的命令

| 命令                   | 功能                                                                       |
| ---------------------- | -------------------------------------------------------------------------- |
| yum install 包名       | 安装指定的软件                                                             |
| yum lcalinstall 软件名 | 安装本地已经下载的软件包                                                   |
| yum goupinstall 组名   | 如果仓库为软件包分了组，则可以通过安装此组来完成安装这个组里面的所有软件包 |
| yum [-y] install 包名  | 安装指定的软件，对于过程中需要确认的询问全部回答 yes                       |
| yum [-y] remove 包名   | 删除指定的软件，YUM 会检查 repository 给出解决依赖关系的提示               |
| yum [-y] erase 包名    | 删除指定的软件                                                             |
| yum groupremove 组名   | 卸载组里面所包括的软件包                                                   |

#### （2）检查、升级软件

| 命令                            | 功能                                                                         |
| ------------------------------- | ---------------------------------------------------------------------------- |
| yum check update                | 检查可升级的 RPM 包                                                          |
| yum update                      | 升级所有可以升级的 RPM 包                                                    |
| yum update kernel kernel-source | 升级指定的 RPM 包，如升级 kernel 和 kernel source                            |
| yum -y update 软件包            | 升级所有的可升级的软件包， -y 表示同意所有，不用一次次确认，避免回答一些问题 |
| yum upgrade                     | 大规模的版本升级。与 yum update 不同的是，连旧的淘汰的包也升级               |
| yum groupupdate 组名            | 升级组里面的软件包                                                           |
| yum update 包名                 | 仅升级指定的软件                                                             |

#### （3）搜索、查询软件

| 命令               | 功能                                                      |
| ------------------ | --------------------------------------------------------- |
| yum search 关键词  | 搜索匹配特定字符的 RPM 包                                 |
| yum list           | 列出资源库（YUM repository）中所有可以安装或更新的 RPM 包 |
| yum list updates   | 列出资源库中所有可以更新的 RPM 包                         |
| yum list installed | 列出所有已安装的 RPM 包                                   |
| yum list extras    | 列出所有已安装但不在资源库中的软件包                      |
| yum list 包名      | 列出所指定的软件包                                        |
| yum deplist 软件名 | 显示程序组信息                                            |
| yum info 包名      | 使用 YUM 获取软件包信息                                   |
| yum info           | 列出资源库中所有可以安装或更新的 RPM 包的信息             |
| yum info updates   | 列出资源库中所有可以更新的 RPM 包的信息                   |
| yum info installed | 列出所有已安装的软件包的信息                              |
| yum info extras    | 列出所有已安装但不在资源库中的软件包信息                  |
| yum provides 包名  | 列出软件包提供那些文件                                    |

#### （4）清除 YUM 缓存

| 命令                     | 功能                                           |
| ------------------------ | ---------------------------------------------- |
| yum clean packages       | 清除缓存目录（/var/cache/yum）下的 RPM 软件包  |
| yum clean headers        | 清除缓存目录下的 RPM 头文件                    |
| yum clean oldheaders     | 清除缓存目录下旧的 RPM 头文件                  |
| yum clean, yum clean all | 清除缓存目录下的 RPM 软件包以及旧的 RPM 头文件 |

### 4、本地源配置

#### （1）加载光驱 `RHEL-8.0-x86_64-dvd.iso`

> 安装系统时的那个镜像文件，它里面就包含了很多系统安装需要自带的一些安装包，在这里可以拿它来模拟一个本地源仓库

![](/pictures/linux云计算/镜像文件.png)

#### （2）进行挂载、配置仓库源

```bash
$ mkdir /mnt/iso					# 创建一个挂载的目录
$ mount /dev/cdrom /mnt/iso			# 挂载的光驱就是 /dev/cdrom
mount: /mnt/iso: WARNING: device write-protected, mounted read-only.		# 提示信息：这是一个写受保护的、挂载着是只读的

$ mkdir /etc/yum.repos.d/backup		# 创建一个备份目录，等会儿用来存放仓库源配置文件
$ cp /etc/yum.repos.d/*.repo /etc/yum.repos.d/backup		# 对仓库源进行备份
$ rm -f /etc/yum.repos.d/*.repo		# 避免其他仓库源的影响，这里清除掉其他的仓库源配置，等会儿我们新建一个本地仓库源

```

```bash
$ vim /etc/yum.repos.d/local.repo
# 将以下内容写入进去
[BaseOS]
name = BaseOS
baseurl = file:///mnt/iso/BaseOS/
enabld = 1
gpgcheck = 0
[AppStream]
name = AppStream
baseurl = file:///mnt/iso/AppStream/
enabled = 1
gpgcheck = 0

$ subscription-manager clean		# 将红帽订阅管理器中的配置缓存也清除掉，不然执行 yum repolist 的命令时，又自动备份回来了
$ yum clean all						# 清除配置缓存
$ yum makecache						# 重新生成配置缓存
$ yum repolist						# 查看可用仓库源
$ yum list							# 查看一下仓库里有那些软件包
$ yum install vim -y				# vim 是iso中自带的，我们就下载它为例
Complete!							# 提示信息：表示安装完成
$ cp /etc/yum.repos.d/backup/*.repo /etc/yum.repos.d/		# 恢复仓库源只需要将配置文件全部拷贝到 yum.repos.d 目录下即可
```

> <code style="color:orangered;">关闭未订阅官方仓库的警告信息</code>

```bash
$ vim /etc/yum/pluginconf.d/subscription-manager.conf		# 将 enabled=1 改成 enabled=0 就不会再收到“未订阅红帽官方的警告信息”
```

#### （3）FTP 仓库源

> 利用本地仓库源做一下简单的变换：

```bash
$ yum remove vsftpd					# 如果已经有了的话，可以删除掉，我这里是从零开始搭建的，配置都是在默认配置上改的
$ yum install -y ftp vsftpd			# 安装 ftp 协议和 vsftpd 服务，ftp协议是该ftp服务的依赖
$ vim /etc/vsftpd/vsftpd.conf		# 修改 ftp 服务的配置文件
# ...
anonymous_enable=YES
anon_root=/mnt/iso
anon_upload_enable=YES
anon_mkdir_write_enable=YES
anon_other_write_enable=YES
download_enable=YES
# ...
$ systemctl start vsftpd			# 启动 ftp 服务
$ systemctl status vsftpd			# 查看 ftp 服务的状态：是否启动，正常运行，则进行下面的操作
```

> 将之前配置的 yum 仓库`redhat-local.repo`里面的地址修改一下：

```bash
$ vim /etc/yum.repos.d/redhat-local.repo		# 修改仓库源配置文件
# 将 baseurl 的值改为 ftp 服务器的地址
[BaseOS]
name = BaseOS
baseurl = ftp://192.168.232.20/BaseOS/
enabld = 1
gpgcheck = 0

[AppStream]
name = AppStream
baseurl = ftp://192.168.232.20/AppStream/
enabled = 1
gpgcheck = 0

$ yum clean all && yum makecache && yum repolist		# 清除缓存、生成新的缓存、更新仓库源
```

## 单元八、网络配置与网络服务部署

> Linux 操作系统是一种开源的、安全稳定性较高的操作系统，其强大的网络功能使得它在服务器的搭建上得到了广泛的应用。用户可以在 Linux 网络操作系统上构建各种服务器，将安装有 Linux 操作系统的服务器配置成不同类型的服务器，使公司得到正常的运营需要。

### 单元目标：

1. 了解 Linux 的网络基础，熟悉网络配置文件的使用。
2. 了解掌握常用的网络配置命令。
3. 熟悉掌握 DNS 服务。
4. 熟练掌握 DHCP 服务。
5. 熟练掌握 FTP 服务。
6. 熟练掌握 Apache 服务。

### 1、NetworkManager

> NetworkManager 是动态控制及配置网络的守护进程，它用于保持当前网络设备及连接处于工作状态，同时也支持传统的 ifcfg 类型的配置文件。
>
> NetworkManager 可以用于以下类型的连接：Ethernet、VLANS、Bridges、Bonds、Teams、Wi-Fi、mobile boradband（如移动 3G）以及 IP-over-InfiniBand。

### 2、nmcli 网络管理命令行工具

> **命令语法：nmcli [选项] 对象 { 命令 | 帮助 }**

> nmcli 主要常用的对象有两个：
>
> - connection：连接，偏重于逻辑设置。
> - device：网络接口，是物理设备。

> 『网卡和连接』的说明：① 添加一张物理网卡设备后，需为该网卡添加连接才能工作，② 网络设备名称和网络连接名称可以不相同。③ 多个连接可以应用到同一个网络接口，但同一时间只能启用其中一个连接。这样可以针对一个网络接口设置多个网络连接，比如静态 IP 和动态 IP。

### 3、使用 nmcli 创建连接

```bash
	# ip地址 、网关地址、连接名以及网络接口名都需要改成自己的
$ nmcli c add type ethernet con-name "static_conn" ifname ens160 ipv4.addresses 192.168.2.10/24 gw4 192.168.232.2 ipv4.dns "8.8.8.8 114.114.114.114" ipv4.method manual autoconnect yes
    # 激活连接
$ nmcli c up static_conn [ifname ens160]（表示可以省略）
    # 查看当前激活连接的IP
$ ip addr 或者 ip a
    # 禁用连接
$ nmcli c down id static_conn
    # 有关nmcli的帮助
$ nmcli --help
```

## 单元九、服务器配置

### 1、FTP 服务配置

> 注意：Linux 上 `FTP服务器` 需要以下两者搭配才能使用

- #### yum 方式安装 ftp 协议

```bash
$ yum install ftp -y	# 安装 ftp 协议
```

- #### yum 方式安装 `vsftpd`（very secure ftp deamon） 服务

```bash
$ yum install vsftpd -y		# 安装 ftp 服务
$ systemctl start vsftpd	# 启动 ftp 服务
$ systemctl status vsftpd	# 查看服务状态：是否启动
```

- #### 关于 `ftp服务` 其他的一些操作

```bash
$ systemctl restart vsftpd	# 重启 vsftpd 服务
$ systemctl enable vsftpd	# 随系统启动
$ firewall-cmd --permanent --add-service=ftp	# 如果防火墙开启的话，让防火墙对ftp服务使用开放状态
$ firewall-cmd --reload		# 重启一下防火墙配置
$ setsebool -P ftpd_full_access=on	# SELinux 安全模式对ftp服务使用开放状态
$ ps -e | grep ftp		# 查看 ftp 进程，ftp 是否启动可以通过进程来看一下
```

- #### 主机连接`FTP`服务器

> 使用 `Xftp` 工具连接 Linux 服务器

- #### `vsftpd` 配置文件

> 接下来说说具体配置，对 ftp 服务器实现更符合自己需求的功能

1. ##### 主配置文件

> `vsftpd`服务程序的主配置文件（`/etc/vsftpd/vsftpd.conf`）的内容总长度达 127 行，但其中大多数参数在开头都添加了“#”号，从而成为注释信息，读者没有必要在注释信息上花费太多的时间，可以使用 grep 命令添加-v 参数，过滤并反选出没有包含“#”的参数行（即过滤掉所有的注释信息），然后将过滤后的参数行通过输出重定向符写回原始的主配置文件中，为了安全起见，请先备份主配置文件，执行相关操作命令如下：

```bash
$ grep -vn '#' /etc/vsftpd/vsftpd.conf	# 通过 -v 参数反选，过滤掉没有 # 字符的行内容并显示行号，内容如下：
12:anonymous_enable=NO
15:local_enable=YES
18:write_enable=YES
22:local_umask=022
36:dirmessage_enable=YES
39:xferlog_enable=YES
42:connect_from_port_20=YES
56:xferlog_std_format=YES
114:listen=NO
123:listen_ipv6=YES
124:
125:pam_service_name=vsftpd
126:userlist_enable=YES
```

- ##### 可配置选项如下：

> `▲` 建议：配置的时候，可以先备份一份配置文件，如果配置失误了，方便进行恢复
>
> <code style="color: orange">命令如下：</code>
>
> ```bash
> mv /etc/vsftpd/vsftpd.conf /etc/vsftpd/vsftpd.conf.bak
> ```

| 参数                                              | 功能说明                                                     |
| ------------------------------------------------- | ------------------------------------------------------------ |
| listen=[YES\|NO]                                  | 是否以独立运行的方式监听服务                                 |
| listen_address=IP 地址                            | 设置要监听的 IP 地址                                         |
| listen_port=21                                    | 设置 FTP 服务的监听端口                                      |
| download_enable ＝[YES\|NO]                       | 是否允许下载文件                                             |
| userlist_enable=[YES\|NO] userlist_deny=[YES\|NO] | 设置用户列表为“允许”还是“禁止”操作                           |
| max_clients=0                                     | 最大客户端连接数，0 为不限制                                 |
| max_per_ip=0                                      | 同一 IP 地址的最大连接数，0 为不限制                         |
| anonymous_enable=[YES\|NO]                        | 是否允许匿名用户访问                                         |
| anon_upload_enable=[YES\|NO]                      | 是否允许匿名用户上传文件                                     |
| anon_umask=022                                    | 匿名用户上传文件的 umask 值                                  |
| anon_root=/var/ftp                                | 匿名用户的 FTP 根目录                                        |
| anon_mkdir_write_enable=[YES\|NO]                 | 是否允许匿名用户创建目录                                     |
| anon_other_write_enable=[YES\|NO]                 | 是否开放匿名用户的其他写入权限（包括重命名、删除等操作权限） |
| anon_max_rate=0                                   | 匿名用户的最大传输速率（字节/秒），0 为不限制                |
| local_enable=[YES\|NO]                            | 是否允许本地用户登录 FTP                                     |
| local_umask=022                                   | 本地用户上传文件的 umask 值                                  |
| local_root=/var/ftp                               | 本地用户的 FTP 根目录                                        |
| chroot_local_user=[YES\|NO]                       | 是否将用户权限禁锢在 FTP 目录，以确保安全                    |
| local_max_rate=0                                  | 本地用户最大传输速率（字节/秒），0 为不限制                  |

2. #### ftp 对外开放共享资源的目录

> 说明：`/var/ftp 文件夹` : 该文件夹是 vsftpd 提供服务的文件集散地，它包括一个 pub 子目录，在默认配置下，所有的目录都是只读的，不过只有 root 用户有写权限。

3. #### 限制用户的 ftp 配置文件

> 说明: `/etc/vsftpd/ftpusers` : 所有位于此文件内的用户都不能访问 vsftpd 服务，当然，为了安全起见，这个文件中默认已经了 root、bin 和 daemon 等系统账号，查看文件内容

### 2、安装 Apache 服务器

- #### 安装

```bash
$ yum install -y httpd		# 安装 Apache 服务
$ yum install -y firefox	# 安装火狐浏览器
$ rpm -qa | grep httpd		# 查看该服务软件是否安装上

```

> <code style="color:orange">注意：</code>利用`setenforce`设置`SELinux`值，重启系统后失效，如果再次使用 http，则仍需重新设置`SELinux`，否则客户端无法访问 Web 服务器。如果想长期有效，则需要修改`/etc/sysconfig/selinux`文件，本教材中多次提到防火墙和`SELinux`，请读者一定要注意，许多问题可能是防火墙和`SELinux`引起的，且对于系统重新启动后失效也需要掌握。

```bash
$ vim /etc/selinux/config	# 打开编辑该文件，使它长期有效
# ...
SELINUX=disabled		# 找到这一行，把它改为 0 或者 permissive
# ...
```

- #### Web 服务的启动与停止

> Apache 软件的后台守护进程是`httpd`，因此在启动和停止 Web 服务时要指`httpd`作为参数使用，Web 服务的启动、停止命令及功能说明

| Web 服务启动、停止命令                          | 功能说明                                    |
| ----------------------------------------------- | ------------------------------------------- |
| systemctl start httpd.service                   | 启动 Web 服务，httpd.service 可简写为 httpd |
| systemctl restart httpd.service                 | 重启 Web 服务（先停止再启动）               |
| systemctl stop httpd.service                    | 停止 Web 服务                               |
| systemctl reload httpd.service                  | 重新加载 Web 服务                           |
| systemctl status httpd.service                  | 查看 Web 服务的状态                         |
| systemctl enable httpd.service                  | 设置 Web 服务为开机自动启动                 |
| systemctl list –unit-file \| grep httpd.service | 查看 Web 服务是否为开机自动启动             |

```bash
# 设置防火墙放行 Apache 服务
$ firewall-cmd --permanent --add-service=http		# CentOS7.x 版本设置了 SELinux 安全模式，这里我们放行 Apache 的服务
$ firewall-cmd --reload			# 重新加载防火墙配置
$ firewall-cmd --list-all		# 查看一下防火墙配置
# 设置 SELinux 安全模式等级为 0，不然也会阻挡 Apache 服务
$ setenforce 0					# 设置安全模式等级，可选值有enforcing、permissive或者1、0
$ getenforce					# 查看 SELinux 安全模式是否设置为允许
# 接下来就可以启动 Apache 服务了
$ systemctl  start  httpd		# 启动 Apache 服务，可以不写后缀 .service
$ systemctl  status  httpd		# 查看 Apache 服务状态，是否启动
$ systemctl  enable  httpd		# 设置开机自启
```

- #### 测试 `httpd` 服务是否安装成功

```bash
$ firefox http://127.0.0.1		# 用火狐浏览器打开该网址尝试一下能不能访问
$ cd /var/www/html				# 进入 Apache 默认向外提供资源服务的目录
$ rz							# 选择上传一个网页文件, 看看效果
$ sz filename					# 下载Linux上的资源到 windows 上
```

- 卸载服务的命令：[参考文献](https://www.python100.com/html/40465GIHOMW4.html)

- `Apache` 服务的配置文件

> 在 Linux 系统中配置服务，其实就是修改服务的配置文件，`httpd`服务程序的主要配置文件及存放位置如下：

| 配置文件的名称 | 存入位置                   |
| -------------- | -------------------------- |
| 服务目录       | /etc/httpd                 |
| 主配置文件     | /etc/httpd/conf/httpd.conf |
| 网站数据目录   | /var/www/html              |
| 访问日志       | /var/log/httpd/access_log  |
| 错误日志       | /var/log/httpd/error_log   |

### 3、安装 samba 服务器

```bash
$ yum install samba -y		# 安装 samba 服务程序
$ rpm -qa | grep samba		# 查询是否安装成功
$
$
$
$

```

- #### `samba` 服务启动、停止

```bash
$ systemctl start smb	# 启动 samba 服务
$ systemctl enable smb	# 设置开机自启（看自己需要设置）
$ systemctl restart smb	# 重启 samba服务 命令
$ systemctl reload smb	# 修改配置文件后，重新加载配置文件使配置生效
$
$
$
$
```

### 4、安装 DNS 服务器

#### （1）yum 下载并安装 DNS 服务

```bash
$ yum clean all		# 清除缓存
$ yum install -y bind bind-chroot.x86_64		# 安装相关服务
$ rpm -qa | grep bind							# 查看 bind 服务是否安装
$ systemctl start named							# 启动 DNS 服务
$ systemctl status named						# 查看 DNS 服务状态
$ ps -eaf | grep named							# 查看 dns 服务进程是否启动
# 补充知识：
$ systemctl stop named							# 停止服务命令
$ systemctl restart named						# 重启服务的命令
$ systemctl enable named						# 加入开机自启
```

#### （2）全局配置文件

> DNS 的全局配置文件是 `/etc/named.conf`

```bash
// ...
options {
        listen-on port 53 { 127.0.0.1; };	// 指定BIND侦听的DNS查询请求的本机IP地址及端口
        listen-on-v6 port 53 { ::1; };		// 限于IPv6
        directory       "/var/named";		// 指定区域配置文件所在的路径
        dump-file       "/var/named/data/cache_dump.db";	// 定义服务器区的数据库文件
        statistics-file "/var/named/data/named_stats.txt";	// 定义named服务的记录文件
        memstatistics-file "/var/named/data/named_mem_stats.txt";
        secroots-file   "/var/named/data/named.secroots";
        recursing-file  "/var/named/data/named.recursing";
        allow-query     { localhost; };						// 指定接收DNS查询请求的客户端

        recursion yes;										// 定义递归式DNS服务器，若不启用递归式则将yes改为no

        dnssec-enable yes;
        dnssec-validation yes;								// 改为no可以忽略SELinux影响

        managed-keys-directory "/var/named/dynamic";

        pid-file "/run/named/named.pid";
        session-keyfile "/run/named/session.key";

        /* https://fedoraproject.org/wiki/Changes/CryptoPolicy */
        include "/etc/crypto-policies/back-ends/bind.config";
};

logging {
        channel default_debug {
                file "data/named.run";
                severity dynamic;
        };
};

zone "." IN {	// 定义一个DNS区域
        type hint;				// 定义区域的类型，有master、hint、slave这3种类型
        file "named.ca";		// 定义区域的列表文件名，即区域数据库文件名
};

include "/etc/named.rfc1912.zones";
include "/etc/named.root.key";
```

- DNS 客户端配置

  （1）在 Windows 客户端，配置 DNS 服务器的 IP 地址的操作 如下图：

![](/pictures/linux云计算/dns配置.png)

​ （2）Linux 客户端，通修改 `/etc/resolv.conf` 文件来设置 DNS 服务器，配置相关命令如下:

```bash
$ vim /etc/resolv.conf		# 将文件内容的这些部分改成自己配置好的DNS服务器的 IP
nameserer 192.168.100.100
nameserer 192.168.100.101
search  lncc.edu.com
```

### 5、安装 DHCP 服务器

#### （1）yum 下载并安装：

```bash
$ yum install -y dhcp dhcp-server		# install dhcp service 和 依赖
```

#### （2）启动 DHCP 并查看服务状态：

```bash
$ systemctl start dhcpd		# 启动 dhcp 服务
$ systemctl status dhcpd	# 查看服务状态：是否启动
# 如果防火墙服务开启了，那么使用下面的命令来放行 dhcp 服务
$ firewall-cmd --permanent --add-service=dhcpd		# 防火墙对 dhcp 服务放行
$ firewall-cmd --reload	# 重新加载防火墙配置文件
$ setenforce 0			# 临时关闭 selinux 安全模式

$ systemctl restart dhcpd	# 重启 dhcp 服务
$ systemctl stop dhcpd		# 停止 dhcp 服务
$ systemctl enable dhcpd	# 设置 dhcp 服务为开机自启
$ systemctl reload dhcpd	# 重新加载 dhcp 服务，如果配置文件更改了，重新加载使它生效
$ systemctl list-unit-files | grep dhcpd.service	# 查看 dhcp服务 是否为开机自启

# 补充知识：
$ systemctl disable firewalld	# 永久禁用防火墙，让它别启动
$ systemctl start firewalld		# 启动防火墙服务
$ vim /etc/selinux/config		# 永久关闭 selinux 安全模式，只需要设置 SELINUX=0 即可
```

## 扩展：`防火墙`和`SELinux`

### （1）防火墙相关操作：

```bash
# 防火墙简单常用命令的使用
$ firewall-cmd --permanent --add-service=dns	# 让防火墙放行 dns 服务，不要阻挡 dns 服务程序的运行
$ firewall-cmd --reload							# 重启防火墙配置，不然可能不会立即生效
# 系统控制工具来配置防火墙
$ systemctl stop firewalld		# 临时关闭防火墙、直接生效，下次开机时会正常开启
$ systemctl status firewalld	# 查看防火墙服务状态
$ systemctl disable firewalld	# 永久禁用防火墙，此次不会生效，下次开机时有效，如果想本次有效，可以结合本次生效一起使用
$ systemctl enable firewalld	# 解开防火墙的禁用，使防火墙应用生效
```

### （2）`SELinux`安全模式：

```bash
$ setenforce 0				# 调整内核级火墙为警告模式，把SELinux安全模式设置为无风险模式
$ getenforce				# 查看 selinux 安全模式等级
$ vim /etc/selinux/config			# 修改配置文件，使它永久关闭 SELinux安全模式
# ...
SELINUX=disabled							# 将这个 字段 设置为 0，然后保存退出
# ...
```

## 扩展：yum 常用操作

### （1）下载某服务功能：

```bash
$ yum install lrzsz		# 表示下载并安装工具 lrzsz，可以接参数 -y 表示安装过程中出现询问是否的全部自动回答肯定 “yes”
```

### （2）不要移除`rpm`安装包

> 需要 yum 安装软件之后保留 rpm 包，可以在 `/etc/yum.conf` 中添加或修改内容为如下：

```bash
$ vim /etc/yum.conf				# 修改 yum 配置文件
# ...
cachedir=/var/cache/yum/$basearch/$releasever		# 把下载后的安装包 更改成自己想要放置的位置，如 /usr/local/rpmcache
keepcache=1		# 表示开启 rpm包 的缓存，安装完之后不要移除安装包
# ...
```

> 注意：rpm 安装包的保存位置是 `/var/cache/yum/`

### （3）清除缓存和生成新缓存

```bash
$ yum clean all			# 清除缓存配置
$ yum makecache			# 生成新配置缓存
```

### （4）CentOS8.0 阿里云仓库源配置文件

```bash
$ wget -O /etc/yum.repos.d/redhat.repo http://mirrors.aliyun.com/repo/Centos-8.repo		# 下载官方提供的仓库源配置文件
$ yum clean all		# 清除缓存
$ yun makecache		# 生成缓存
```

### （5）yum 其他命令和参数

> yum [options] [command] [package ...]

| 参数/命令    | 作用描述                                          |
| ------------ | ------------------------------------------------- |
| -y           | 默认 yum 需要是交互模式，-y 表示自动提供 yes 响应 |
| search       | 搜索某个软件名或关键字                            |
| list         | 列出所有 yum 所管理的软件包和名称                 |
| info         | 同上，也类似 rpm -qai                             |
| provides     | 查找该命令是由软件安装生成的，类似 rpm -df 的功能 |
| repolist     | 列出所有可用的仓库源                              |
| install      | 后面接需要安装的软件                              |
| reinstall    | 后面接需要重新安装的软件                          |
| update       | 后面接需要升级到的软件                            |
| check-update | 检查可用的升级包                                  |
| downgrade    | 后面接需要降级到的版本                            |
| remove       | 卸载软件                                          |
| clean all    | 清楚 yum 缓存                                     |
| makecache    | 将服务器软件包信息缓存至本地，提高搜索安装效率    |
|              |                                                   |

### （6）仅仅只下载软件包

```bash
$ yum reinstall -y --downloadonly --downloaddir=/rpm/AppStream/ lrzsz		# 下载软件包到我创建的目录里面去
```

## 扩展：控制台 和 vim 快捷键

### 1、控制台

|  快捷键  |               功能               |
| :------: | :------------------------------: |
| Ctrl + U |    剪切光标所在行光标前的内容    |
| Ctrl + Y | 将剪切掉的内容粘贴到光标所在位置 |
| Ctrl + C |        停止正在运行的任务        |

:rocket: 推荐: [快捷键操作参考文献](https://blog.csdn.net/qq_43119867/article/details/133893489)

### 2、vim 快捷键

```bash
$ vim filename		# 进入某个文件，在命令模式下使用下面的命令
$ gg				# 等于 [[ 光标定位到文件第一行
$ G(shift + G)		# 等于 ]] 光标定位到最后一行

$ Ctrl + e			# 向下滚动一行
$ Ctrl + y			# 向上滚动一行

$ Ctrl + d			# 向下滚动半屏
$ Ctrl + u			# 向上滚动半屏

$ Ctrl + f			# 向下滚动一屏
$ Ctrl + b			# 向上滚动一屏

:1,10d			# 删除 1 - 10行的内容
:1,$d			# 删除 1 - 最后一行的内容, 即删除所有行，$ 表示最后

$ ddp			# 交换当前行和下一行
```

## windows 和 linux 目录共享

#### 一、windows 目录共享到 linux

##### 1、在 `windows` 上选择要共享的目录

> 鼠标右键找到 `属性` 点击进入

![](/pictures/linux云计算/右键选择属性.png)

##### 2、点击 `共享` 选项设置栏

![](/pictures/linux云计算/共享设置.png)

##### 3、设置匿名共享（不需要用户名和密码登录）

- 添加 `Guest` 访问，如果下拉菜单没有该选项，就在输入栏里面输入吧。

> 设置注意设置为 `读写权限`，否则在访问时是 `只读` 的了。

![](/pictures/linux云计算/设置访问用户.png)

- 文件已经共享出去

![](/pictures/linux云计算/文件已共享.png)

- 修改无需密码访问

![](/pictures/linux云计算/无需密码访问.png)

##### 4、linux 上挂载并访问 windows 的目录

- 复制 windows 给出的共享网络路径

  > 在 windows 的`资源管理器`中可以直接访问该路径

![](/pictures/linux云计算/网络路径.png)

- linux 上挂载后访问

> 在 Linux 上挂载时，要注意将 windows 给出的网络文件共享路径中的 `\` 改成 `/`，并且将 `\\` 后面的 "主机名"，我这里是 "DESKTOP-KAP08UL" 改成 windows 的 IPv4 地址。windows 上的 IPv4 地址通过 `ipconfig` 查看。

```bash
$ mkdir /window/share												# 创建目录供挂载使用
$ mount -t cifs //172.23.240.42/shell-scripts /window/share/		# 将网络共享文件挂载到刚刚创建的目录中，无需密码，直接回车即可
$ ls /window/share							# 可以查看一下该目录下，是否有windows共享目录中的文件
```

- 挂在成功效果图:

![](/pictures/linux云计算/共享成功效果.png)

##### 5、说明事项：

> （1）mount 之前先要在 linux 创建挂载的目录
>
> （2）其中的 username 和 password 为图 1 共享用户的步骤 3 时候，选择的用户以及其密码（这是设置用户名和密码登录的情况下的注意事项）
>
> （3）然后将网络路径的 `\\DESKTOP-KAP08UL\shell-scripts` 其中的`DESKTOP-KAP08UL`换为自己的`主机ip`即可，注意复制下来的文件路径分隔符号 `\` 是 windows 风格的，在复制到 linux 的时候，需要换成符号 `/`

#### 二、linux 目录共享到 windows

##### 1、关闭防火墙

```bash
$ firewall-cmd --state		# 查看防火墙状态
$ systemctl stop firewalld.service		# 关闭防火墙
$ systemctl disable firewalld.service	# 禁止防火墙开机启动
$ getenforce	# 查看 seliun 安全模式是否关闭
$ setenforce 0	# 临时关闭安全模式
$ vim /etc/selinux/config		# 更改配置文件永久关闭安全模式
# ...
SELINUX=disabled		# 禁用掉linux的安全模式
```

##### 2、安装 samba 服务

```bash
$ yum install -y samba
```

##### 3、修改配置文件

> 将下面的内容追加到 `/etc/samba/smb.conf` 文件中

```txt
# ...

[root]
        comment = this is Linux share directory
        path = 你需要共享的目录
        public = yes
        writable = yes
        guest ok = no
        create mask = 0775
        directory mask = 0775
```

##### 4、设置 smb 服务的 root 账户密码

```bash
$ smbpasswd -a root
# 两次键入密码...
```

##### 5、开启 smb 服务器

```bash
$ systemctl start smb		# 开启smb服务器命令
$ systemctl status smb 		# 或者 service smb status 查看smb服务的状态
$ systemctl restart smb		# 重启命令
$ systemctl enable smb.service	# 设置开机自启
```

> 确保 setlinux 关闭，可以用 setenforce 0 命令执行。 默认的，SELinux 禁止网络上对 Samba 服务器上的共享目录进行写操作，即使你在`smb.conf`中允许了这项操作。

##### 6、在 windows 直接访问

> 在 `资源管理器` （即 `我的电脑`）的地址栏输入 `\\linux上的ip地址` 即可访问（参考下面的效果图）。
>
> 然后输入 root 用户名和 以及步骤 4 的 smbpasswd 命令输入的密码

- 配置代码截图如下：(方便和效果图做对比，是可以配置多个共享目录的)

![](/pictures/linux云计算/smb共享目录配置.png)

- 效果如下：

![](/pictures/linux云计算/linux向windows共享目录.png)

## 扩展：Shell Script

### 1、编写脚本

> 假设现在处于 /home/zhouyu/ 路径下

```sh
# myscript.sh
echo "Hello World!"			# 打印一段文本
```

### 2、运行方式

- bash 方式运行

```bash
$ bash /home/zhouyu/myscript.sh			# bash myscript.sh	相对路径执行
```

- sh 方式运行

```bash
$ sh /home/zhouyu/myscript.sh			# sh myscript.sh	相对路径执行
```

- source 方式运行

```bash
$ source /home/zhouyu/myscript.sh		# source myscript.sh  相对路径执行
```

- 脚本前面加 \. 方式运行

```bash
$ . /home/zhouyu/myscript.sh			# . myscript.sh
```

- 更改脚本的权限

> 默认地，系统赋予编辑器创建的文件的许可权是 664，没有执行的权限，此时可以用 chmod 命令使 Shell 程序成为可执行文件。

```bash
$ chmod 777 myscript.sh	# 更改权限让所有人都可以读/写/执行
$ ./myscript.sh			# 相对路径直接执行
$ /home/zhouyu/myscript.sh	# 绝对路径运行该脚本
```

### 3、基础知识

#### （1）一个 Shell Script 脚本通常包括如下部分。

1. 首行。

   首行表示脚本将要调用的 Shell 的 bash 解释器，如下显示内容。

   ```sh
   #! /bin/bash
   ```

2. 注释。

   注释符号“#”放在需要注释内容的前面，最好备注 Shell 脚本的功能以防日后忘记。

   ```sh
   #! /bin/bash
   # 安装 nginx 服务
   yum install -y nginx		# 行尾可以再添加注释内容说明该行命令的作用: 下载并安装 nginx 服务
   ```

3. 脚本内容

   需要执行的具体命令。

#### （2）养成良好的 `Shell Script` 编程习惯

- 为方便以后的维护和阅读，拥有良好的编程习惯非常重要！建议在脚本文件中包含如下内容：

> （1）Script 的功能。
>
> （2）Script 的版本信息。
>
> （3）Script 的作者与联系方式。
>
> （4）Script 的版权声明方式。
>
> （5）Script 的历史记录。
>
> （6）Script 内软特殊的命令，使用绝对路径的方式来进行。
>
> （7）Script 运行时需要的环境变量预先声明与设置。

#### （3）变量使用

- 定义变量

```sh
A=5;b=10;
echo $A, $b;	# 使用变量，用 $ 接变量名来引用变量
```

- 使用变量

> 通过 `$varname` 使用变量

- 撤销变量（也叫 删除变量）

```sh
unset A;	# 只能单个撤销
```

- 静态变量

```sh
readonly C='hello world';		# readonly 标识定义静态变量
echo $C;
unset C;	# 不能撤销静态变量的定义
```

#### （4）列出所有变量

```bash
$ set
```

#### （5）环境变量

> 用户自定义变量只在当前的 Shell 中生效，而环境变量会在当前 Shell 及其所有子 Shell 中生效，如果环境变量写入相应的配置文件，那么这个环境变量将会在所有的 Shell 中生效。

#### （6）位置参数变量

> $n：$0代表命令本身，`$[1-9]`代表接受的第`[1-9]`个参数，10 以上需要用`{}`括起来，比如`${10}` 代表接收的第 10 个参数。
>
> $\*：表接收所有的参数，将所有参数看作一个整体。
>
> $@：表接收的所有参数，将每个参数区别对待。
>
> $#：代表接收的参数个数。

#### （7）预定义变量

> 预定义变量是在 Shell 一开始时就定义的变量，这一点和默认环境变量有些类似。不同的是，预定义变量不能重新定义，用户只能根据 Shell 的定义来使用这些变量，预定义变量作用，如下表所示：
>
> 严格来说，位置参数变量也是预定义变量的一种，只是位置参数变量的作用比较统一，所以我们把位置参数变量单独划分为一类数量。

| 预定义变量 | 功能说明                                                                                                                                                       |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| $?         | 最后一次执行的命令的返回状态。如果这个变量的值为 0，则证明上一条命令正确执行；如果这 个变量的值为非 0 (具体是哪个数由命令自己来决定)，则证明上一条命令执行错误 |
| $$         | 当前进程的进程号（PID)                                                                                                                                         |
| $!         | 后台运行的最后一个进程的进程号（PID)                                                                                                                           |

```bash
$ echo "hello"
$ echo $?		# 由于上一条命令执行正确，所以这里的 $? 预定义变量的值就是 0，如果执行错误就会变成 非0值，具体多少，看命令自己返回多少，反正是 非0值

$ echo $$		# 当前进程的进程号（PID)
$ echo $!		# 后台运行的最后一个进程的进程号（PID)
```

#### （8）read 命令

> read [-ers] [-a 数组] [-d 分隔符] [-i 缓冲区文字] [-u 文件描述符] [名称 ...]

| 可选参数            | 功能                                    |
| ------------------- | --------------------------------------- |
| -p "按任意键退出: " | 提示信息                                |
| -t 3                | 单位(秒),超过等待时间自动结束输入       |
| [-n \| -N] 1        | 读取多少个字符个数                      |
| -i 缓冲区文字       |                                         |
| -a arraryname       | 把输入的单词全部存放在数组 arrayname 中 |

```bash
$ read -p "please input a number: " num1		# -p 后面接的是提示信息，然后放了一个变量等待用户输入，将值保存在这个变量中
$ echo $num1									# 输出变量 num1 值
```

#### （9）配置环境变量

> 配置文件：/etc/profile

```bash
$ cp /etc/profile /etc/profile.bak		# 备份一下，操作失误方便恢复
$ vim /etc/profile						# 对它新增内容
# ...
export myname=ZY;	# 注意需要用 export 暴露出去
#...
$ source /etc/profile					# 让配置文件立即生效
$ echo $myname							# 此时就能看到我们配置的环境变量的值了
```

#### （10）双引号和单引号的区别

> （1）双引号里面的内容可以引用变量、将 \*、\等符号当做特殊字符操作。
>
> （2）单引号会将特殊字符进行转义，也就是完全当成字符串输出。

### 4、算术运算

> 算术运算是编程里面经常用到的，但是 shell 编程中的算术运算跟主流的 C、Python、Java 等语言的算术运算表达式的写法有略微的差别。
>
> 默认情况下，shell 不会直接进行算术运算，而是把"算术符号"当做"字符串"与两个变量的值连接在了一起，形成了一个新的字符串，那么，在 bash 中，应该怎样进行算术运算呢？细分之下，常用方法有 6 种，如下。

- :warning:此处先对各种方法进行概述:

> (1) 使用`let`命令进行算术运算，`只支持整数`运算。
>
> (2) 使用`expr`命令进行算术运算，`只支持整数`运算。
>
> (3) 使用运算语法：`$[算术表达式]`，`只支持整数`运算。
>
> (4) 使用运算语法：`$((算术表达式))`，`只支持整数`运算。
>
> (5) 在`初始化变量`时，将`变量定义为"整数"类`型，则可直接进行整数运算。
>
> (6) 使用`bc命令`进行算术运算，`支持整数和小数`运算。
>
> (7) 使用`awk命令`进行算数运算，`支持整数和小数`运算。

#### （1）let 命令运算

> :warning:注意：只支持整数运算，小数运算会报错。

```bash
$ let result=2+5
$ echo $result
# 结果为: 7

$ let t=3.2*3
$ echo $t
# 错误: -bash: let: t=3.2*2: syntax error: invalid arithmetic operator (error token is ".2*2")
```

> 🚀 从上图中可以看到，当借助 let 命令进行算术运算时，"运算过程"与"运算结果"中都不会包含小数，而且这种方法需要借助一个变量，将计算后的值赋值给这个变量后进行输出，但是 let 命令是 shell 内建命令，这是它的优势，只要当前服务器上存在 shell，即可使用它进行整数运算。

#### （2）expr 命令运算

> :warning:expr 命令也支持算术运算功能，虽然它的功能不止于此，但是此处我们只使用它进行算术运算，expr 命令与 let 命令相似，也只能进行整数运算，而且，使用 expr 命令进行算术运算时，需要注意以下两点:
>
> :one: 数值与运算符号之间需要用空格隔开，否则无法进行算术运算。
>
> :two:使用 expr 命令进行乘法运算时，需要将"乘号"转义，否则会报错。

```bash
# 验证第一点: 数值与运算符号之间要加空格
$ expr 2 + 3			# 注意必须加空格，否则当成字符串
# 结果是: 5
$ expr 2+3
# 结果是: 2+3

# 验证第二点：乘号 * 要进行转义
$ expr 2 \* 3
# 结果: 6
$ expr 5 / 2		# 向下取整
# 结果: 2
$ expr 2 * 3
# 错误：expr: syntax error: unexpected argument ‘bin’
```

- :heavy_check_mark: 使用`计算值`

> 当然，如果我们想要使用经过计算过的值，可以使用`命令引用`: \` \`。

```bash
$ a=`expr 3 + 2`			# 不是单引号，而是英文输入法下直接按键盘左上角的 波浪线~ 那个键所产生的符号,如果再不知道的话，那就直接复制我这里写好的符号吧: ``
$ echo $a

# 刚开始学习 shell 算术运算的时候可能遇到的问题：
$ echo "expr 2 + 3" 		# 发现没有效果，而是当字符串打印出来
$ echo expr 2 + 3			# 跟上面的效果是一样的，原样输出
# 结果: expr 2 + 3
$ echo (expr 2 + 3)			# 发现直接报错了
# -bash: syntax error near unexpected token `expr'
```

> :tada:恭喜你，你现在对算术运算算是基本掌握了。现在你终于知道领悟到 shell 编程 的一些特殊的地方了吧，好了，继续开始下一关 `>>>`

#### （3）bc 命令运算

> bc 命令大家可能已经很熟悉了，它是 linux 下最常用的"计算器"，我们可以借助 bc 命令进行算术运算，使用这种方法的优势就是支持小数运算。
>
> :warning:注意：
>
> ​ (1)除法的结果中默认不会产生小数，而是会向下取整。
>
> ​ (2)运算结果的精度以表达式中精度最高的为准。
>
> ​ (3)在使用"除法"时，需要指定小数点精度，否则运算结果中不会包含小数，使用 scale 指定小数点精度。
>
> ​ (4)运算结果不足 1 时，则不会显示小数点前面的 0。

```bash
# 验证第一条注意事项：
$ echo "2 + 3.0 / 2" | bc
# 结果: 3, 因为 3.0 / 2 的结果向下取整为 1
$ echo "scale=3; 2 + 3.0 / 2" | bc				# 指定表达式计算结果的小数精度
# 结果: 3.500, 因为整个表达式以三位小数的精度去计算

# 验证第二条注意事项：
$ echo "3.5 * 2.00" | bc						# 2.00的精度最高，结果以它的精度为准，小数的位数不会叠加，也不会因为小数为0就舍弃
# 结果: 7.00

# 验证第三条注意事项：
$ echo "3.0 / 2" | bc							# 没有指定计算结果的精度，默认不会产生小数
# 结果: 1，因为除法运算没指定精度会向下取整

# 验证第四条注意事项：
$ echo "0.2 + 0.3" | bc							# 运算结果不足 1
# 结果: .5
$ echo "3.8 % 3.0"  | bc						# 运算结果不足 1
# 结果: .8
```

#### （4）运算语法 $[算术表达式]

> :warning:这种方法貌似很简单，结果也确实也很简单，but，它只支持整数运算:heavy_exclamation_mark:

```bash
$ echo $[2 * 3]		# 数值与运算符之间有没有空格都没关系，结果都是对的
$ echo $[2*3]
# 结果: 6
```

#### （5）运算语法 $((算术表达式))

```bash
$ echo $((5/3+2))		# 有除法的运算不指定结果精度基本上都是默认向下取整
# 结果: 3
```

#### （6）将变量声明为整型

> 这种方法也比较简单，可以直接将变量声明为"整数"，然后即可直接进行整数运算，示例如下：

```bash
$ declare -i s		# 声明 s 的属性是整型，之后进行的赋值等号右侧内容被当做算术表达式执行
$ s=6+6				# 不能有空格
$ echo $s
# 结果: 12
```

#### （7）awk 命令运算

> 与 sed 命令一样，也是一个强大的命令。有时间在好好学习一下这一块的内容。暂时搁置吧:sweat_smile:

### 5、Shell 基础编程实践

- echo -n:表示不换行输出

- echo -e：输出转义字符，将转义后的内容输出到屏幕上

- 常用的转义字符如下（只有 echo -ne）加了 e 才能执行）：

- \b:转义后相当于按退恪键(backspace)，但前提是"\b"后面存在字符;""b"表示删除前一个字符，""bb"表示删除前两个字符。
- \c:不换行输出，在""c"后面不存在字符的情况下，作用相当于 echo -n;但是当""c"后面仍然存在字符时，"kc"后面的字符将不会被输出。in 换行，被输出的宁符从"In"处开始另起一行.
- \f:换行，但是换行后的新行的开头位詈连接着上一行的行尾;w 与 f 相同;
- \t:转以后表示插入 tab，即横向制表符;
- \r:光标移至行首，但不换行，相当于使用"\r"以后的字符覆盖"\r"之前同等长度的字符;但是当"\r"后面不存在任何字符时，"\r"前面的字符不会被覆盖
- \表示插入""本身。

#### （1）九九乘法表

```bash
#! /bin/bash

for i in {1..9}
do
        for ((j=1;j<=i;j++))
        do
                echo -ne "$j*$i=$[$i*$j]\t"
        done
        echo
done

```

- 输出结果

```bash
$ sh ./for.sh
1*1=1
1*2=2   2*2=4
1*3=3   2*3=6   3*3=9
1*4=4   2*4=8   3*4=12  4*4=16
1*5=5   2*5=10  3*5=15  4*5=20  5*5=25
1*6=6   2*6=12  3*6=18  4*6=24  5*6=30  6*6=36
1*7=7   2*7=14  3*7=21  4*7=28  5*7=35  6*7=42  7*7=49
1*8=8   2*8=16  3*8=24  4*8=32  5*8=40  6*8=48  7*8=56  8*8=64
1*9=9   2*9=18  3*9=27  4*9=36  5*9=45  6*9=54  7*9=63  8*9=72  9*9=81
```

#### （2）求 1 ~ 100 的和

```bash
#! /bin/bash

sum=0
for ((i=1;i<=100;i++))
do
        sum=$[$i+$sum]
done
echo $sum

```

- 输出结果

```bash
$ sh ./for.sh
5050
```

#### （3）求 1 ~ 100 的奇偶数各自的和

```bash
#! /bin/bash

odd=0
even=0
for ((i=1;i<=100;i++))
do
	if (( $i % 2 == 0 ))
	then
		even=$(($i+$even))
	else
		odd=$(($i+$odd))
	fi
done
echo "奇数是: $odd, 偶数是: $even"

```

- 输出结果

```bash
$ sh ./for.sh
奇数是: 2500, 偶数是: 2550
```

#### （4）步长求和（技巧）

> :one: 利用 `seq` 生成序列。
>
> :two: 语法: `seq 步长 开始项 结束项`

```bash
#! /bin/bash

total=0
for i in `seq 2 2 100`
do
	total=$[$total+$i]
done
echo $total

```

- 输出结果

```bash
$ sh ./for.sh
2550
```

#### （5）输出指定数字段的和

```bash
#! /bin/bash

read -p "请输入开始数字: " x
read -p "请输入结束数字: " y

total=0
for ((;x<=y;x++))
do
	total=$[$x+$total]
done
echo "结果: $total"

```

- 输出结果

```bash
$ sh ./for.sh
请输入开始数字: 1
请输入结束数字: 10
结果: 55
```

#### （6）求 0 ~ 255 之间数字的二进制形式

```bash
#! /bin/bash

read -p "请输入一个0-255之间的数字: " num

if [[ $num -ge 0 && $num -le 255 ]]
then
        echo "输入正确...^_^..."
        tmp=$num
        for ((i=1;i<=8;i++))
        do
                sum=$[$tmp % 2]$sum
                tmp=$[$tmp / 2]
        done
        echo "$sum"
else
        echo "输入错误!"
fi
```

- 输出结果

```bash
$ sh ./for.sh
请输入一个0-255之间的数字: 10
输入正确...^_^...
00001010
```

（7）用 for 循环计算

> 问题：某山顶上有一颗香蕉树，一只猴子第一天从树上摘了若干根香蕉，当即就吃了一半，还不过瘾，又多吃了一根。第二天猴子又将剩下的香蕉吃了一半，禁不住诱惑，又多吃了一根香蕉。依此类推，每天都将剩余的香蕉吃一半后再多吃一根。到了第十天，猴子发现只剩一根香蕉了，请问这只猴子在第一天总共摘了多少根香蕉？

```bash
#! /bin/bash

sum=1
for ((i=1;i<=9;i++))
do
        sum=$[($sum + 1) * 2]
done
echo "第一天总共摘了: $sum根香蕉."
```

- 输出结果

```bash
$ sh ./for.sh
第一天总共摘了: 1534根香蕉.
```

#### （8）while 循环

```bash
#! /bin/bash

# while实现求1-100的和
i=1;sum=0
while ((i<=100))
do
    sum=$(($sum+$i))
    i=$(($i+1))
done
echo $sum
```

- 输出结果

```bash
$ sh ./command.sh
5050
```

#### （9）函数编程

> shell 编程常见错误解决：[参考文献](https://blog.csdn.net/weixin_65690979/article/details/128810462)

```bash
#! /bin/bash

# 求第n位斐波那契数列的数
factorial () {
    i=1     # 初始值1
    j=1     # 初始值1
    index=3 # 索引3开始
    result=$(($i+$j))	# 前两位的和
    n=$1    # 需要第几位的斐波那契数列
    if [[ $n -eq 1 || $n -eq 2 ]]
    then
        echo $i
    else
        while ((index++<=$n))	# 注意循环变量的自增，在这里一行代码完成判断和自增
        do
            result=$(($i+$j))	# 前两位的和
            i=$j				# 与下面这一行功能一样，它们前两位的位置分别向后移动
            j=$result
        done
        echo $result			# 循环走完，打印结果
    fi
}

# 1 1 2 3 5 8 13 21 34 55
# 89 144 233 377 610 987 1597 2584 4181 6765
# 10946 17711 28657 46368 75025 121393
factorial 20
```

- 输出结果

```bash
$ sh ./command.sh
6765
```

#### （10）求斐波那契数列（自编高效版本）

- 第一版

```bash
#! /bin/bash

function factorial {
    # （1）输入一个索引值，如果该索引值为 1 或 2 则返回对应的数字
    index=$1
    if [[ $index -eq 1 || $index -eq 2 ]]
    then
        echo 1
    else
        # （2）如果该数字大于 2，则进行while循环，定义两个开始值：
        #                   start=1,
        #                   end=1,
        #                   result=$((start+end))
        #   前两个不断地向后移动，直到索引值自增等于指定的索引值为止

        base=3              # 定义一个开始索引
        start=1             # 斐波那契数列第一个数值
        finnal=1            # 斐波那契数列第二个数值
        tmp=0
        while (( base++ <= index ))     # 双圆括号里面要写正常的python数学表达式
        do
            tmp=$((start + finnal))
            start=$((finnal))
            finnal=$tmp
            # base=$((base+1))
        done
        echo $tmp
    fi
}

# 测试斐波那契数列：
# 1 1 2 3 5
# 18 13 21 34 55
# 89 144 233 377 610
# 987 1597 2584 4181 6765
# 10946 17711 28657 46368 75025

# 调用函数，将返回值赋值给变量 num
num=$(factorial $1)
echo "索引为 $1 位置的斐波那契数为：$num"
```

- 第二版

```bash
#!/bin/bash

function factorial {
        # $1 表示用户输入的想要的斐波那契数列中的数的位置
        position=$1		# 标记用户输入的位置
        start=1			# 定义斐波那契数列第一个数
        end=1			# 定义斐波那契数列第二个数
        result=$end		# 定义不断递增的结果变量
        if [ $position -eq 0 ] || [ $position -eq 1 ] || [ $position -eq 2 ]		# 判断位置是否为起始地址
        then
                echo "第 $position 位斐波那契数列数是: $result"		# 打印结果
        elif [ $position -ge 3 ]
        then
                index=3
                while [ $index -le $position ]
                do
                        result=$((start+end))		# 控制数字不断累加、递增
                        start=$end
                        end=$result
                        index=$((index+1))
                done
                echo "第 $position 位斐波那契数列数是: $result"		# 打印结果
        else
                echo "输入有误, 请检查输入是否合法!"
        fi
}

factorial $1
```

## 习题

### 第一章 安装与配置 Linux 操作系统

#### 一、填空题

1. Linux 诞生于 1991 年 10 月 5 日，由<code><u>Linus(李纳斯)</u></code>开发的。
2. Linux 是一个<code><u>多</u></code>任务、<code><u>多</u></code>用户的操作系统。
3. Linux 的版本分为<code><u>内核版</u></code>和<code><u>发行版</u></code>。
4. 安装 Linux 最少需要两个分区，分别是<code><u>根分区(/)</u></code>和<code><u>交换分区(swap)</u></code>。
5. Linux 默认的系统管理员账号是<code><u>root</u></code>。

#### 二、选择题

1. Linux 的内核版本 2.3.20 是（ <code><u>A</u></code> ）的版本。

   A. 不稳定 B. 稳定 C. 第三次修订 D. 第二次修订

<code style="color:deeppink">解析：（1）内核的开发和规范一直由 Linus 领到的开发小组控制着，版本也是唯一的。（2）Linux 内核的版本号命名是有一定规则的，版本号的格式通常为“主版本号.次版本号.修正号”。其中次版本号：偶数表示稳定版本，奇数表示开发中版本（不稳定版本）。（3）Linux 发行版有哪些：Debian、Ubuntu、RHEL、Fedora、CentOS、SUSE 等</code>

### 第二章 管理文件系统

#### `重点补充：`

##### （1）文件系统类型

> 概念：文件系统类型指的就是：在磁盘上组织文件的办法。

| 系统版本   | 文件系统类型（默认的） |
| ---------- | ---------------------- |
| 早期 Linux | ext2                   |
| RHEL 6     | ext4                   |
| RHEL 7     | XFS                    |

##### （2）默认目录功能

| 目录  | 功能                                                      |
| ----- | --------------------------------------------------------- |
| /     | 根目录，文件的最顶端，整个文件系统的根目录                |
| /bin  | 存放系统所需要的重要命令                                  |
| /boot | 存放 Linux 开机启动时的内核及引导系统程序所需要的核心文件 |
| /dev  | 存放设备文件                                              |
| /etc  | 存放配置文件                                              |
| /home | 普通用户的主目录                                          |
| /root | Linux 超级权限用户的家目录                                |
| /mnt  | 存放挂载存储设备的挂载目录                                |
| /lib  | 主要存放动态链接库                                        |

##### （3）文件权限与归属

> 文件有不同的类型，比如软链接文件、目录文件、普通的 txt 文件等。最常见的要记住，下面已经标记出来了！

| 前缀                                   | 含义         |
| -------------------------------------- | ------------ |
| <code style="color: deeppink">-</code> | 普通文件     |
| <code style="color: deeppink">d</code> | 目录文件     |
| <code style="color: deeppink">l</code> | 链接文件     |
| b                                      | 块设备文件   |
| c                                      | 字符设备文件 |
| p                                      | 管道文件     |

```bash
$ mkdir /test && ll /test
drwxr-xr-x. 3 root root 19 Dec 10 18:51 test1
```

> 前面一串字母第一个字母 `d` 就表示它是一个目录，根据表格里的`前缀`依次类推，这串字母中的第一个字母就代表了该文件类型。

##### （4）文件的默认权限

| 字母表示法 | 数字表示法 | 含义         |
| ---------- | ---------- | ------------ |
| -          | 0          | 没有任何权限 |
| x          | 1          | 执行权限     |
| w          | 2          | 写权限       |
| r          | 4          | 读权限       |

> 很多时候以数字的和的值来设置文件的可读可写可执行权限。比如
>
> （1）设置普通文件 test 的权限为属主可读可写可执行，属组的权限默认，其他用户权限为可读可执行，那么命令就是：chmod 744 test;
>
> （2）设置目录文件 test 的权限为属主可读可写可执行，属组的权限默认，其他用户权限为可读可执行，那么命令就是：chmod 755 test;
>
> （3）给属主、属组、其他用户追加权限的命令：
>
> ​ chmod u-r test1.txt
>
> ​ chmod g+w test1.txt
>
> ​ chmod o+w test1.txt

> <code style="color: orange">\+</code> 表示增加权限，<code style="color: orange">\-</code> 表示移除权限。

| 所属用户的字母表示 | 含义     |
| ------------------ | -------- |
| u                  | 属主     |
| g                  | 属组     |
| o                  | 其他用户 |
| a                  | 所有用户 |

> `新建目录的权限：默认 755`
>
> `新建普通文件的权限：默认 744`

```bash
# 目录文件
[root@localhost ~]# mkdir /test && ll / | grep test
drwxr-xr-x.   2 root root    6 Dec 10 19:30 test

# 普通文件
[root@localhost ~]# touch /text1.txt && ll / | grep text1.txt
-rw-r--r--.   1 root root    0 Dec 10 19:30 text1.txt
```

#### 一、填空题

1. 在 Linux 系统中命令<code style="color: orangered"><u>区分</u></code>大小写。在命令行中，可以使用<code style="color: orangered"><u>Tab</u></code>键来自动补全。
2. 如果在一个命令行上输入和执行多条命令，可以使用<code style="color: orangered"><u>分号</u></code>来分隔命令。
3. 要使程序以后台方式执行，只需要在执行命令后跟上一个<code style="color: orangered"><u>&</u></code>符号。
4. <code style="color: orangered"><u>\.</u></code>代表当前目录，也可以用<code style="color: orangered"><u>\./</u></code>来表示。<code style="color: orangered"><u>\.\.</u></code>代表上一层目录，也可以用<code style="color: orangered"><u>\.\./</u></code>来表示。
5. 若文件名前多一个“\.”，则代表该文件为<code style="color: orangered"><u>隐藏文件</u></code>，可以使用 <code style="color: orangered"><u>ls -a</u></code> 命令查看隐藏文件。

#### 二、选择题

1. 如果忘记了 ls 命令的用法，可以采用（ <code style="color: orangered"><u>C</u></code> ）命令获得帮助。

   A、? ls B、help ls C、man ls D、get ls

2. 存放 Linux 基本命令的目录是什么？（ <code style="color: orangered"><u>A</u></code> ）

   A、/bin B、/tmp C、/lib D、/root

#### 三、简答题

1. 在 RHEL7 系统及众多的 Linux 系统中，最常使用的 Shell 终端是什么？

   :white_check_mark:：<code style="color: orangered"><u>terminal</u></code>。

2. 执行 Linux 系统命令时，添加参数的目的是什么？

   :white_check_mark:：<code style="color: orangered"><u>改变其行为或提供额外的信息</u></code>。

3. Linux 系统命令、命令参数及命令对象之间，普遍应该使用什么来间隔？

   :white_check_mark:：<code style="color: orangered"><u>空格</u></code>。

4. 在使用 mkdir 命令创建有嵌套关系的目录时，应该加上什么参数呢？

   :white_check_mark:：<code style="color: orangered"><u>-p</u></code>。

5. 在使用 rm 命令删除文件或目录时，可使用哪个参数来避免二次确认呢？（其实就是强制删除）

   :white_check_mark:：<code style="color: orangered"><u>-f</u></code>。

6. 若某个文件的所有者具有文件的读/写/执行权限，其余人仅有读权限，那么用数字法表示是什么？

   :white_check_mark:：题设要求拥有者有读、写、执行权限，其他人仅有读权限，而属组默认是读、执行权限，故该文件权限的数字法表示为<code style="color: orangered"><u>754</u></code>。

### 第三章、Shell 与文本处理

#### 一、填空题

1. 由于核心在内存中是受保护的区块，因此必须通过 <code style="color: deeppink; text-decoration: underline">Shell</code> 将输入的命令与 Kernel 沟通，以便让 Kernel 可以控制硬件正确无误地工作。
2. Shell 变量有其规定的作用范围，可以分为 <code style="color: deeppink; text-decoration: underline">局部变量</code> 和 <code style="color: deeppink; text-decoration: underline">全局变量</code> 。
3. <code style="color: deeppink; text-decoration: underline">set</code> 可以观察目前 <code style="color: deeppink; text-decoration: underline">bash</code> 环境下的所有变量。
4. 通配符主要有 <code style="color: deeppink; text-decoration: underline">\*</code>、<code style="color: deeppink; text-decoration: underline">?</code>、<code style="color: deeppink; text-decoration: underline">\[]</code> 等。

#### 二、简答题

1. vim 编辑器的三种模式分别是什么？

   :white_check_mark: <code style="color: deeppink; text-decoration: underline">命令模式、编辑模式、末行模式。</code>

2. 怎么从输入模式切换到末行模式？

   :white_check_mark: <code style="color: deeppink; text-decoration: underline">按 ESC 进入命令模式，再按冒号 (英文输入法下 shfit+/ 组合键)即可进入末行模式。</code>

3. 把 ls 命令的正常输出信息追加写入 error.txt 文件中的命令是什么？

   :white_check_mark: <code style="color: deeppink; text-decoration: underline">ls >> error.txt</code>

4. 请简单概述管道符的作用。

   :white_check_mark: <code style="color: deeppink; text-decoration: underline">管道符（|）用于将一个命令的输出传递给另一个命令作为输入。</code>

5. Bash 解释器的通配符中，星号 \* 代表几个字符 ？

   :white_check_mark: <code style="color: deeppink; text-decoration: underline">星号（\*）代表零个或多个字符。它可以匹配任意长度的字符序列，包括零个字符。</code>

6. PATH 变量的作用是什么？

   :white_check_mark: <code style="color: deeppink; text-decoration: underline">PATH 是一个环境变量，用于指定可执行程序的搜索路径。</code>

7. 使用什么命令可以把名为 LINUX 的一般变量转换成全局变量?

   :white_check_mark: <code style="color: deeppink; text-decoration: underline">export 命令。</code>

### 第四章、管理 Linux 服务器的用户、组群及特殊权限

#### 一、填空题

1. Linux 操作系统是 <code style="color: orange; text-decoration: underline">多用户</code>、多任务的操作系统，它允许多个用户同时登陆到系统，使用系统资源。
2. Linux 系统下的用户账号分为两种：普通账号和管理员账号。
3. CentOS7 中 root 用户的 UID 为 <code style="color: orange; text-decoration: underline">0</code>，普通用户的 UID 可以在创建时由管理员指定，如果不指定，用户的 UID 默认从 <code style="color: orange; text-decoration: underline">1000</code>1000 开始顺序编号。
4. 在 Linux 系统中，所创建的用户账户及其相关信息（口令除外）均放在 <code style="color: orange; text-decoration: underline">/etc/passwd</code>配置文件中。
5. 由于所有用户对 <code style="color: orange; text-decoration: underline">/etc/passwd</code>文件均有读权限，为了增强系统的安全性，用户经过加密之后的口令都存放在 <code style="color: orange; text-decoration: underline">/etc/shadow</code>文件中。
6. 组群账户的信息存放在 <code style="color: orange; text-decoration: underline">/etc/group</code>文件中，而关于组群管理的信息（组群口令、组成员等）则存放在 <code style="color: orange; text-decoration: underline">/etc/gshadow</code>文件中。

#### 二、选择题

1. 哪个目录存放用户密码信息？（ <code style="color: orange; text-decoration: underline">A</code> ）

   A、/etc B、/var C、/dev D、/boot

2. 用户登录系统后首先进入下列哪个目录？（ <code style="color: orange; text-decoration: underline">D</code> ）

   A、/home B、/root 的主目录 C、/usr D、用户自己的根目录

3. 下列哪个参数可以删除一个用户并同时删除用户的主目录？（ <code style="color: orange; text-decoration: underline">C</code> ）

   A、rmuser -r B、deluser -r C、userdel -r D、usermgr -r

4. 系统管理应该采用哪些安全措施？（ <code style="color: orange; text-decoration: underline">C</code> ）

   A、把 root 密码告诉每一位用户 B、设置 Telnet 服务来提供远程系统维护 C、经常检测账户数量、内存信息和磁盘信息 D、员工辞职后，立刻删除该用户账户

5. 下列哪个命令可以用来检测用户 lisa 的信息？（ <code style="color: orange; text-decoration: underline">C</code> ）

   A、finger lisa B、grep lisa /etc/passwd C、find lisa /etc/passwd D、who lisa

#### 三、简答题

1. 在 RHEL7 系统中，root 管理员是谁？

   :white_check_mark: :<code style="color: orange; text-decoration: underline">root 管理员是系统的超级用户，通常对整个系统拥有最高权限。</code>

2. 如何使用 Linux 系统的命令来添加或删除用户？

   :white_check_mark:：<code style="color: orange; text-decoration: underline">用 useradd username 命令添加用户，用 userdel username 命令删除用户。</code>

3. /home 目录和/root 目录存放的文件有何相同点以及不同点？

   :white_check_mark:相同点：

   ​ 用户数据存储： 两个目录都是用于存放用户数据的地方。

   ​ 用户主目录：通常，每个用户在 /home 目录下都有一个以其用户名命名的子目录，作为用户的主目录。而在 /root 目录下则是超级用户（root）的主目录。

   :white_check_mark:不同点：

   ​ 权限：

   ​ :white_check_mark:：<code style="color: orange; text-decoration: underline">/home 目录下的用户主目录一般由相应用户拥有，用户可以对自己的主目录有一定的控制权限。</code>

   ​ :white_check_mark:：<code style="color: orange; text-decoration: underline">/root 目录是超级用户的目录，一般只有超级用户（root）具有对该目录的写权限。</code>

   总体来说，/home 目录用于存放普通用户的数据，而 /root 目录则是超级用户的主目录。这两个目录在文件系统中有着不同的作用和权限。

### 第五章 管理磁盘

#### 一、填空题

1. 1998 年，加利福尼亚大学伯克利分校首次提出并定义了 RAID（Redundant Array of Inexpensive Disks）中文全称是 <code style="color: orange; text-decoration: underline;">独立磁盘冗余阵列</code> 技术的概念。RAID 技术通过把 <code style="color: orange; text-decoration: underline;">多个</code> 硬盘设备组合成一个容量更大、安全性更好的磁盘 <code style="color: orange; text-decoration: underline;">阵列</code> ，并把数据切割成多个区段后分别存放在各个不同的物理硬盘设备上，然后利用分散读写技术来提升磁盘阵列整体的 <code style="color: orange; text-decoration: underline;">性能</code>，同时把多个重要数据的副本同步到不同的物理硬盘设备上，从而起到了非常好的数据 <code style="color: orange; text-decoration: underline;">冗余</code> 备份效果。
2. RAID 可分为 <code style="color: orange; text-decoration: underline;">软 RAID</code> 和 <code style="color: orange; text-decoration: underline;">硬 RAID</code>，软 RAID 通过软件实现多块硬盘 <code style="color: orange; text-decoration: underline;">冗余</code>，而硬 RAID 一般是通过 <code style="color: orange; text-decoration: underline;">RAID 卡</code> 来实现 RAID 的。
3. LVM（Logic Volume Manager）的中文全称是 <code style="color: orange; text-decoration: underline;">逻辑卷管理器</code>，最早应用在 IBM AIX 系统上，它的主要作用是 <code style="color: orange; text-decoration: underline;">动态分配磁盘分区</code> 及调整磁盘分区大小，并且可以让多个分区或者物理硬盘作为 <code style="color: orange; text-decoration: underline;">逻辑卷</code> 来使用。

#### 二、选择题

1. 在一个新分区上建立文件系统应该使用命令（ <code style="color: deeppink; text-decoration: underline;">C</code> ）。

   A、fdisk B、makefs C、mkfs D、format

2. Linux 文件系统的目录结构是一颗倒挂的树，文件都按其作用分门别类地存放在相关的目录中。现在有一个外部设备文件，我们应该将其放在（ <code style="color: deeppink; text-decoration: underline;">C</code> ）目录中。

   A、/bin B、/etc C、/dev D、lib

3. 请选择关于`/etc/fstab`的正确描述（ <code style="color: deeppink; text-decoration: underline;">B</code> ）。

   A、启动系统后，有系统自动产生

   B、用于管理文件系统信息

   C、用于设置命名规则，是否使用可以用 TAB 来命名文件

   D、保存硬件信息

4. 假定 Kernel 支持`vfat`分区，下面哪个操作时将`/dev/hda1`（一个 Windows 分区）加载至`/win`目录？（ <code style="color: deeppink; text-decoration: underline;">D</code> ）

   A、mount -t windows /win /dev/hda1

   B、mount -fs=msdos /dev/hda1 /win

   C、mount -s win /dev/hda1 /win

   D、mount -t vfat /dev/hda1 /win

#### 三、简答题

1. 假如一个设备的文件名称为`/dev/sdb`，可以确认它是主板第二个插槽上的文件吗？

   :white_check_mark:：不，设备文件名称 `/dev/sdb` 的命名并不直接表示它连接到主板上的第二个插槽。在 Linux 系统中，`/dev/sdb` 是指系统中的第二个 SCSI 设备（或 SATA 设备，或 USB 存储设备），而不是主板插槽的编号。

2. 如果硬盘中需要 5 个分区，至少需要几个逻辑分区？

   :white_check_mark:：如果硬盘需要 5 个分区，那么可以考虑分配四个主分区，其中一个主分区指定为扩展分区，然后在该扩展分区内创建两个逻辑分区，这样三个主分区加上两个逻辑分区就可以实现 5 个分区了。

3. `/dev/sda5`是主分区还是逻辑分区？

   :white_check_mark:：逻辑分区。

4. 哪个服务决定了设备在`/dev`目录中的名称？

   :white_check_mark:：udev(设备管理守护进程)。udev 是一个用于管理设备节点的守护进程，它负责动态创建、删除和管理`/dev`目录下的设备文件。

5. 用一句话描述挂载操作。

   :white_check_mark:：挂载是将存储设备或文件系统与指定的目录关联，使其内容可在该目录中访问和操作的过程。

6. RAID 技术主要是为了解决什么问题呢？

   :white_check_mark:：（1）提高数据存储性能；（2）提高数据冗余和可靠性。

7. RAID 0 和 RAID 5 哪个更安全？

   :white_check_mark:：RAID 5 相对于 RAID 0 更安全。

8. 位于 LVM 最底层的是物理卷还是卷组？

   :white_check_mark:：位于最底层的是物理卷。

9. LVM 对逻辑卷的扩容和缩容操作有何异同点？

   :white_check_mark:：相同点

   ​ （1）在线操作：LVM 允许在线进行逻辑卷的扩容和缩容操作，而不需要卸载文件系统或重启系统。

   ​ （2）灵活性： LVM 提供了很高的灵活性，可以根据需要动态调整逻辑卷的大小。

   :white_check_mark:：不同点

   ​ （1）操作步骤不同，扩容和缩容的操作步骤是相反的。

   ​ （2）文件系统支持：在某些情况下，文件系统可能需要特殊的工具或步骤来支持缩小操作。不是所有的文件系统都支持在线缩小。

   ​ （3）数据安全性：扩容操作通常比较安全，因为它只涉及增加空间。缩容操作可能涉及数据的移动和调整，需要更小心以确保数据的完整性。

10. LVM 的删除顺序是怎么样的？

    :white_check_mark:：（1）卸载文件系统；（2）删除逻辑卷；（3）删除卷组；（4）删除物理卷。

### 第六章 软件包的安装与管理

#### 一、填空题

1. RPM 的全名是 <code style="color:deeppink;text-decoration:underline;">Red Hat Package Manager（红帽包管理器）</code> 是由 Red Hat 公司开发的，流传甚广。在用户端的系统上。
2. RPM 最大的问题是软件之间的 <code style="color:deeppink;text-decoration:underline;">依赖性</code> 问题。
3. RPM 软件的属性依赖问题，已经由 <code style="color:deeppink;text-decoration:underline;">YUM</code> 或者是 APT 等方式加以解决。RHEL 使用的就是 <code style="color:deeppink;text-decoration:underline;">YUM</code> 机制。

#### 二、简答题

- 请简述 RPM 和 YUM 的区别。

  :white_check_mark:：RPM（Red Hat Package Manager）和 YUM（Yellowdog Updater, Modified）是在 Linux 系统上用于软件包管理的两个相关但不同的工具。

  1. RPM（Red Hat Package Manager）:

     - RPM 是一种软件包管理系统，用于在 Red Hat 系列的 Linux 发行版（如 Red Hat Enterprise Linux、Fedora、CentOS 等）上安装、更新和卸载软件包。
     - RPM 主要关注于软件包的基本操作，例如安装、升级和卸载。它不自动解决软件包之间的依赖性问题，需要用户手动管理依赖关系。
     - RPM 格式的软件包通常以 .rpm 为扩展名。

  2. YUM（Yellowdog Updater, Modified）:
     - YUM 是基于 RPM 的包管理工具，它使用 RPM 来执行底层操作，但它提供了更高级的功能，特别是自动解决依赖性问题。
     - YUM 通过检查和解决软件包之间的依赖性，自动下载并安装所需的软件包及其依赖关系，简化了系统管理员的工作。
     - YUM 提供了一个更友好、高级的用户界面，使软件包的管理更加容易。
     - YUM 的配置文件位于 /etc/yum.conf。

  总体而言，RPM 是底层的软件包管理工具，而 YUM 则是在 RPM 基础上构建的更高级的包管理工具，通过自动解决依赖性问题简化了系统管理。在 RHEL（Red Hat Enterprise Linux）等 Red Hat 系列的发行版中，系统管理员通常使用 YUM 来管理软件包。在较新的发行版中，DNF（Dandified YUM）已经取代了 YUM，提供了类似的功能并引入了一些改进。

### 第七章 Linux 系统监视与进程管理

#### 一、选择题

1. 下列那种说法是错误的？（ <code style="color: green;font-weight:bolder;text-decoration:underline;">B</code> ）

   A、一个进程可以是一个作业 `B、一个进程可以是多个作业`

   C、多个进程可以是一个作业 D、一个作业可以是一个或多个进程

2. 从后台启动进程，应在命令的结尾加上什么符号？（ <code style="color: green;font-weight:bolder;text-decoration:underline;">D</code> ）

   A、$ B、# C、@ `D、&`

3. Linux 中的程序运行有-20~19 共 40 个优先级，以下哪种优先级最高？（ <code style="color: green;font-weight:bolder;text-decoration:underline;">A</code> ）

   `A、-16` B、11 C、18 D、0

4. 要显示系统中进程的详细信息，应使用哪个命令？（ <code style="color: green;font-weight:bolder;text-decoration:underline;">D</code> ）

   A、ps -e B、ps -A C、ps -a `D、ps -l`

5. 哪种调度命令可以多次执行？（ <code style="color: green;font-weight:bolder;text-decoration:underline;">A</code> ）

   `A、cron` B、at C、batch D、cron、at 和 batch

6. 在某用户的 crontab 文件中有以下记录：

   48 6 \* \* 5 mycmd

   则该行中的命令多久执行一次？（ <code style="color: green;font-weight:bolder;text-decoration:underline;">D</code> ）

   A、每小时 B、每周 C、每年五月的每小时 1 次 `D、每周五`

7. 在某用户的 crontab 文件中有以下记录：

   _/4 _ \* \* \* wall Please see news!

   则该行中的命令多久执行一次？（ <code style="color: green;font-weight:bolder;text-decoration:underline;">A</code> ）

   `A、每4分钟执行一次` B、每 4 小时执行一次 C、不会运行，格式无效 D、每周四运行

8. 以下说法中正确的是哪个？（ <code style="color: green;font-weight:bolder;text-decoration:underline;">C</code> ）

   A、ps 命令可查看当前内存使用情况 B、free 命令可查看当前 CPU 使用情况

   `C、bg命令可将前台作业切换到后台` D、top 命令可查看当前已登录的所有用户

9. 在 Linux 系统中，各种系统日志文件主要存放在系统中的哪个目录中？（ <code style="color: green;font-weight:bolder;text-decoration:underline;">B</code> ）

   A、/home `B、/var` C、/boot D、/usr

10. 对于 hbzy 用户的 crontab 配置文件，其路径和文件名是什么？（ <code style="color: deeppink;font-weight:bolder;text-decoration:underline;">B</code> ）

    A、/var/cron/hbzy `B、/var/spool/cron/hbzy`

    C、/home/hbzy/cron D、/home/hbzy/crontab

#### 二、操作题

1. 使用 ps 命令显示当前进程的详细信息。

   ```bash
   $ ps -l
   ```

2. 使用 who 命令显示当前已登录用户的详细信息。

   ```bash
   $ who -aH
   ```

3. 使用 top 命令动态监视系统性能，要求每 10 秒刷新一次。

   ```bash
   $ top -d 10
   ```

4. 设置 at 调度，要求在 2013 年 12 月 24 日 23 时 59 分 向登录到系统上的所有用户发送 "Merry Christmas!" 信息。

   ```bash
   $ at 23:59 12/24/13
   at>echo "Merry Christmas!" | wall		# Ctl + D 退出
   ```

5. 设置 cron 调度，要求在每周一下午 5:10 分删除 /Temporary 目录下的全部内容。

   ```bash
   $ crontab -e
   10 17 * * 1 rm -rf /Temporary/*
   $ service crond restart
   ```

### 第八章 网络配置与网络服务部署

#### 一、选择题

1. 以下重启 Linux 的命令有（ <code style="color:deeppink">BC</code> ）。

   A、init 6 B、reboot C、shutdown -r now D、shutdown -h

2. 配置网卡时，下面哪一项一般不需要配置（ <code style="color:deeppink">D</code> ）。

   A、IP 地址 B、子网掩码 C、默认网关地址 D、MAC 地址

3. Linux 中某个文件包含了主机的域名搜索顺序和 DNS 服务器的 IP 地址。该文件是（ <code style="color:deeppink">B</code> ）。

   A、/etc/hosts B、/etc/resolv.conf C、/etc/sysconfig/network-scripts 目录下的文件

4. DHCP 是动态主机配置协议的简称，其作用是可以使网络管理员通过一台服务器来管理一个网络系统，自动地为一个网络中的主机分配（ <code style="color:deeppink">D</code> ）地址。

   A、网络 B、MAC C、TCP D、IP

5. 若需要检查当前 Linux 系统是否安装了 DHCP 服务器，以下命令正确的是（ <code style="color:deeppink">A</code> ）。

   A、rpm -q dhcp B、rpm -ql dhcp C、rpm -q dhcpd D、rpm -ql

6. DHCP 服务器的主配置文件是（ <code style="color:deeppink">C</code> ）。

   A、/etc/dhcp.conf B、/etc/dhcp C、/etc/dhcp/dhcpd.conf D、/usr/share/doc/dhcp-4.1.1/dhcpd.conf.sample

7. 启动 DHCP 服务器的命令有（ <code style="color:deeppink">A</code> ）。

   A、service dhcpd start B、servie restart dhcpd

   C、servie start dhcpd D、service dhcpd restart

8. 以下对 DHCP 服务器的描述错误的是（ <code style="color:deeppink">B</code> ）。

   A、启动 DHCP 服务器的命令是 service dhcpd start

   B、对 DHCP 服务器的配置，均可通过配置 /etc/dhcp.conf 来完成

   C、在定义作用域时，一个网段通常定义一个作用域，可通过 range 语句指定可分配的 IP 地址范围，使用 option routers 语句指定默认网关

   D、DHCP 服务器必须指定一个固定的 IP 地址

9. Apache 的主配置文件是（ <code style="color:deeppink">A</code> ）。

   A、httpd.conf B、httpd.cfg C、access.cfg D、apache.conf

10. 手工安装 Apache 服务器时，默认的 Web 站点的目录为（ <code style="color:deeppink">B</code> ）。

    A、/etc/httpd B、/var/www/html C、/etc/home D、/home/httpd

11. 对于 Apache 服务器，提供的子进程的缺省的用户是（ <code style="color:deeppink">D</code> ）。

    A、root B、apached C、httpd D、nobody

12. 世界上排名第一的 Web 服务器是（ <code style="color:deeppink">A</code> ）。

    A、Apache B、IIS C、SunONE D、NCSA

13. Apache 服务器默认的工作方式是（ <code style="color:deeppink">D</code> ）。

    A、inetd B、xinetd C、standby D、standalone

14. 用户的主页存放的目录由文件 `httpd.conf` 的参数（ <code style="color:deeppink">D</code> ）设定。

    A、UserDir B、Directory C、public_html D、DocumentRoot

15. 设置 Apache 服务器时，一般将服务的端口绑定到系统的（ <code style="color:deeppink">C</code> ）端口上。

    A、10000 B、23 C、80 D、53

16. （ <code style="color:deeppink">D</code> ）不是 Apache 基于主机的访问控制指令。

    A、allow B、deny C、order D、all

17. 用来设定当服务器产生错误时，显示在浏览器上的管理员的 E-mail 地址的是（ <code style="color:deeppink">B</code> ）。

    A、Servername B、ServerAdmin C、ServerRoot D、DocumentRoot

18. 在 Apache 基于用户名的访问控制中，生成用户密码文件的命令是（ <code style="color:deeppink">B</code> ）。

    A、smbpasswd B、htpasswd C、passwd D、password

19. ftp 命令的哪个参数可以与指定的机器建立连接？（ <code style="color:deeppink">D</code> ）

    A、connect B、close C、cdup D、open

20. FTP 服务使用的端口是（ <code style="color:deeppink">A</code> ）。

    A、21 B、23 C、25 D、53

21. 我们从 Internet 上获得软件最常采用的是（ <code style="color:deeppink">C</code> ）。

    A、WWW B、telnet C、FTP D、DNS

22. 一次可以下载多个文件用（ <code style="color:deeppink">A</code> ）命令。

    A、mget B、get C、put D、mput

23. 下面（ <code style="color:deeppink">A</code> ）不是 FTP 用户的类别。

    A、real B、anonymous C、guest D、users

24. 修改文件 `vsftpd.conf` 的（ <code style="color:deeppink">A</code> ）可以实现 vsftpd 服务独立启动。

    A、listen=YES B、listen=NO C、boot=standalone D、#listen=YES

25. 将用户加入以下（ <code style="color:deeppink">B</code> ）文件中可能会阻止用户访问 FTP 服务器。

    A、vsftpd/ftpusers B、vsftpd/user_list C、ftpd/ftpusers D、ftpd/userlist

#### 二、简答题

1. 如何在 DHCP 服务器中为某一计算机分配固定的 IP 地址？

   （1）登录 DHCP 服务器管理界面或使用相关命令行工具。

   （2）寻找"静态分配"、"固定地址"、"地址预订"或类似的选项。

   （3）输入计算机的 MAC 地址和要分配的固定 IP 地址。

   （4）保存更改。

#### 三、操作题

1. 重启网络服务的命令是什么？

   :white_check_mark:：systemctl restart NetworkManager

2. 查看 Linux 有几块网卡以及网卡 IP 用什么命令？

   :white_check_mark:：（1）ifconfig

   :white_check_mark:：（2）ip addr show 或 ip a

### 第九章 Shell 编程

#### 一、填空题

1. 一个 bash Shell 脚本的第一行是 <code style="color:orangered;text-decoration:underline;">#! /bin/bash</code>。
2. Shell 执行脚本的方式之一：bash < Shell 程序名,这种方法是利用输入 <code style="color:orangered;text-decoration:underline;">重定向</code>，使 Shell 命令解释程序的输入，来自指定的 Shell 程序文件。
3. [ ]表示 <code style="color:orangered;text-decoration:underline;">条件</code> 测试。注意这里的空格很重要。要注意在"["后面和"]"前面都必须要有空格。
4. 在 Shell 中，then 和 fi 是分开的语句。如果要在同一行里面输入，则需要用 <code style="color:orangered;text-decoration:underline;">分号</code> 将它们隔开。
5. case 行尾必须为单词 in，每个模式必须以 <code style="color:orangered;text-decoration:underline;">右括号</code> 结束， <code style="color:orangered;text-decoration:underline;">双分号</code> 表示命令序列结束。

#### 二、Shell 编程题

1. 编写 Shell 脚本，计算 1~100 的和。

```bash
#! /bin/bash

sum=0
for ((i=1;i<=100;i++))
do
        sum=$((i+sum))
done

echo "1~100的和为: $sum"
```

2. 编写 Shell 脚本，输入一个数字 n 并计算 1~n 的和。要求：如果输入的数字小于 1，则重新输入，直到输入正确的数字为止。

```bash
#! /bin/bash

read -p "请输入一个大于0的整数: " num
sum=0
while [ $num -lt 1 ]
do
        echo "输入有误!"
        read -p "请输入一个大于0的整数: " num
done

for ((i = 1; i <= $num; i++))
do
        sum=$((i + sum))		# 累加求和操作
done

echo "结果为: $sum"
```

3. 编写 Shell 脚本，批量建立用户 user_00、user_01，...，user_99。

```bash
#! /bin/bash

for (( i = 0; i <= 9; i++))				# 控制用户名标识符的第一个数字的变化
do
        for (( j=0; j <= 9; j++))		# 控制用户名标识符的第二个数字的变化
        do
                useradd user_$i$j;		# 创建用户
        done
done

echo "用户建立完成..."		# 提示用户创建完成
tail -n 100 /etc/passwd		# 将创建的用户打印看一下
```

4. 编写 Shell 脚本，实现两个变量之间的加减乘除运算。

```bash
#! /bin/bash

function func {
  echo "加法结果: " $(($1+$2))
  echo "减法结果: " $(($1-$2))
  echo "乘法结果: " $(($1*$2))
  echo "除法结果: " $(($1/$2))
}
func $1 $2
```
