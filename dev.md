
# 技术细节及优化点

## 1. 架构设计

## 2. 数据接入

## 3. 核心api

## 4. express场景

- 页面诊断
    - 页面访问时间
    - 页面js错误
    - 慢会话的跟踪
    - dns劫持
    - 错误按层级区分
        - 资源完整性导致的错误
        - 渲染错误
        - 用户行为错误
        - 内部逻辑错误
    - 策略上报（以上功能的上报）
    - 缓存策略及丢包处理

# 页面访问时间

- 传输层，放在客户端（前端）处理
- 客户端计算，上报（window相关api）

# 页面js错误

- 客户端（前端）捕获
- 捕获的时候需要改写原型链的错误机制
    - src/errorMonitor/error.js
    - window.onerror、window.addEventListener('error')、window.addEventListener('unhandledrejection')、window.addEventListener('abort')
        - window.onerror与window.addEventListener('error')的区别
            - 前者获取的是运行过程中running-time直接获取到的错误
                - 前者是编译过程中js-core编辑级别的，所以报错是更底层的，能直接看到具体的位置
            - 后者获取的是已经冒泡上来的事件
                - 后者是webpack等编译后的，所以报错溯源可能会偏移
        - unhandledrejection 与上述两者并列，相当于是错误场景的补全
        - abort 更多偏向于资源获取完整性的问题（资源加载中断等）
        - 前三者更多是页面、用户行为相关的
            - 捕获错误
            - 错误上报
            - 避免引发prod环境问题，尽量不阻断渲染（不白屏）

# 错误截图

## 业内分类

- 本项目模拟操作系统调度I/O调度，去进行堆栈处理跟缓存处理
    - 临时日志，用完则清理（或者定期清理）
- 第二种
    - 传统桌面端应用（qq）
    - 隔一段时间进行截图，当出现错误，则把定时任务abort掉并上报日志
- 第三种
    - web rtc技术
    - 需要授权
    - 音视频出现错误的时候，进行相关操作
    - 腾讯会议、zoom用的比较多（视频流、直播层都用这块技术）

# 慢会话跟踪
- 例如，一次资源加载（5-30s），需要前后端对此类进行跟踪分析并优化
    - cdn资源
    - ssr、服务器资源
    - websocket追踪
    - 视频流的链接（web rtc）

# dns劫持
- 对于dns攻击进行标识、记录，并追踪优化

# 策略上报
- 什么样的数据上报？
- 采样的数据是什么样的？

# 缓存策略及丢包导致的错误处理
- 