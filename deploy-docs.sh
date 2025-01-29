#!/bin/bash

# 可以直接一键运行：会执行开发代码推送 - 项目打包构建 - 打包项目推送
# 注意其他开发项目中不能存在 .git 文件

set -x

#export DEV=git@gitee.com:zhouyu2156/DevCode.git
#export PRO=git@gitee.com:zhouyu2156/zhouyu2156.git
export DEV=git@github.com:ZhouYu2156/DevCode.git
export PRO=git@github.com:ZhouYu2156/zhouyu2156.github.io.git

# 提交开发代码
git add .
git commit -m "auto commit Docs DevCode."
git push -f ${DEV} main

# 提交打包代码
cd ./docs
npm run build

cd src/dist/
git add .
git commit -m "auto commit docs/dist"
#git pull --allow-unrelated-histories ${PRO} master
git push -f ${PRO} main
echo "打包代码提交完成"

#cd ../
#rm -rf dist
#cd src/dist
#git init
#git add .
#git commit -m "auto commit Docs Production Project."
# git push -u ${PRO} master     # 第一次提交代码到仓库
#git push -f ${PRO} master

# 361024912@qq.com
#export Second_PRO=https://gitee.com/EvanZhou2156/evanzhou2156.git
#git init
#git add .
#git commit -m "auto commit Docs Production Project To EvanZhou houseware."
#git push -u ${Second_PRO} master
#git push -f ${Second_PRO} master

#export github_PRO=git@github.com:ZhouYu2156/zhouyu2156.github.io.git
#git init
#git add .
#git commit -m "auto commit Docs Production Project.To github houseware."
#git push -u ${github_PRO} master
#git push -f ${github_PRO} master
