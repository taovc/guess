<h1 align="center">
    you draw i guess
    <div>
        <a><img src="myapp/src/Assets/home.jpeg"
       title="guess" alt="guess"></a>
    </div>
</h1>

# Description

> 项目 你画我猜
>
> -注册模块
> 用户名密码， 密码可以自选加密方式（需要验证用户名是否已被注册过，密码安全程度自己定义）。
>
> -登陆/退出 模块
> -jwt注册登记并写入浏览器
> -登陆成功进入你画我猜首页（首页只允许登陆玩家访问）
> -在任意界面都能退出登录
>
> 首页
> -所有待加入游戏的房间列表
> -创建游戏房间按钮
> -游戏开始的房间需要实时从列表删除
>
> 游戏房间
> -随时能返回房间
> -至少俩个人，房主开始游戏，实时从首页列表把该房间移除
> -一个画板，俩个人随机一人作画，一人猜
> -通过发送信息方式把答案发送到公屏
> -直到猜到为止，结束游戏

# Techonologies used

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)

![React](https://img.shields.io/badge/-ReactJs-61DAFB?logo=react&logoColor=white&style=for-the-badge)

![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

## Authors

- [Tao Weijie](https://github.com/taovc) - tao.weijie@epitech.eu

## Installation

### Clone

- Clone this repo to your local machine using
 `git clone git@github.com:taovc/guess.git`

### Setup

- install docker
 `follow the instruction on https://docs.docker.com/get-docker/`


- install docker-compose
    `follow the instruction on https://docs.docker.com/compose/install/`

# Run

- run the app
    `docker-compose up`

# Open the app

- open the app
    `http://localhost:3000/`