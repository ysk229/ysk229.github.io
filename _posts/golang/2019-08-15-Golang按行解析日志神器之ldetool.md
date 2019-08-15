---
layout: post
title: Golang按行解析日志神器之ldetool
description: ldetool 这个工具更像一个DSL，通过一种语法来写解析的语法，然后通过 ldetool generate 命令来生成 golang 代码，这个代码就是针对某中格式单行的解析方法
category:
    - 大数据
photos: http://ww1.sinaimg.cn/mw690/81b78497jw1emfgwkasznj21hc0u0qb7.jpg
tags:
    - golang
    - 工具
    - 日志
---

为什么称为神器，[请看](https://blog.csdn.net/orangleliu/article/details/85038304)
此文章解析日志的性能和使用方便测试

## 0.安装

```bash
go get -u github.com/sirkon/ldetool
```

## 1.使用命令行如下

```bash
ldetool generate --package 包名 规则文件.lde
```

生成Golang规则类的文件，在Golang中调它的方法如下

```go
//规则定义的类名
l := &Line{}
str :="hello world"
if ok, err := l.Extract(str);ok && err ==nil{
    //Time是规则定的属性
    fmt.Sprintf("%s",l.Time)
}
```

## 2.实际例子

### 2.1日志内容

```bash
27.154.70.117 - - [20/Nov/2018:20:23:56 +0800] 2 "GET http://7img1.tianlaikge.com/tv/homeimage/201709/shengridangao.zip HTTP/1.1" 200 842186 841382 "-" "-" "Dalvik/2.1.0 (Linux; U; Android 7.1.2; vivo Y79A Build/N2G47H)" "-" 219082621 "HIT" 27.159.73.35
```

### 2.2 ldetool规则文件

```bash
vim nginx.lde
```

```yml
Nginx =
    IP(string) " "
    ^"- - [" Time(string) ']'
    ^" "Cost(uint32)" "
    ^'"'Request(string)'"'
    ^" "Status(int64)" "
    ByteSend(int64)" "
    BodyByteSend(int64)" "
    ^'"'Referer(string)'"'
    ^" "
    ^'"'Cookie(string)'"'
    ^' '
    ^'"'UserAgent(string)'"'
    ^' '
    ^'"'Xfor(string)'"'
    ^' 'ConnID(string)' '
    ^'"'Hit(string)'"'
    ^" "
    ServerIp(string)
;
```

格式是

```yml
类名=
##IP则它义定的属性，因为golang的原因，首字母要大写，如果是id则要ID都得大写
IP(string) " "
;
```

## 3.规则详解

![规则](img/规则.png 'ldetool 规则')

## 4.参考文章

[官方](https://github.com/sirkon/ldetool)
