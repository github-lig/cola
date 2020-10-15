

# JVM进程正常退出

​	1. 调用System.exit() 或者 Runtime.exit()

​	2. 所有非daemon线程完全终止

## 如何保证一个进程不结束  

​	保证至少一个非daemon线程一直在运行

​	参考springboot启动tomcat服务

```
private void startDaemonAwaitThread() {
    Thread awaitThread = new Thread("container-" + containerCounter.get()) {
        public void run() {
            TomcatWebServer.this.tomcat.getServer().await();
        }
    };
    awaitThread.setContextClassLoader(this.getClass().getClassLoader());
    awaitThread.setDaemon(false);
    awaitThread.start();
}
```

在await方法中执行下述逻辑

```
if (this.getPortWithOffset() == -1) {
	try {
		this.awaitThread = Thread.currentThread();
		while(!this.stopAwait) {
			try {
				Thread.sleep(10000L);
			} catch (InterruptedException var64) {}
		}
	} finally {
		this.awaitThread = null;
	}

}
```



# 阻塞队列 & 非阻塞队列

## 	阻塞队列 

​		阻塞队列多是通过ReentrantLock来实现线程安全性（lock&&unlock）和阻塞（Condition）的特性。阻塞特性体现在调用put和take方法时，如果队列已满，那么put会被阻塞，当队列有空余空间时唤醒并返回，如果队列无元素，那么take会被阻塞，当队列添加了新元素时被唤醒并返回。  

### 		常用的阻塞队列

  - LinkedBlockingQueue ：基于链表实现的有界阻塞队列

  - ArrayBlockingQueue ：基于数组实现的有界阻塞队列

  - PriorityBlockingQueue：基于优先级的无界阻塞队列

  - DelayQueue：基于优先级队列实现的延迟队列

  - SynchronousQueue：不存储元素的阻塞队列

  - LinkedTransferQueue：链表结构的无界阻塞队列

  - LinkedBlockingDeque：链表结构的双向阻塞队列

    

##### 说明

- ​	有界、无界：除了SynchronousQueue队列明确是有界的，其他队列在于有无设置队列大小，如果未设置，默认为Integer.MAX_VALUE，相当于是无界队列。PriorityBlockingQueue即使设置了队列大小，当队列满时，也会进行扩容


-    LinkedBlockingQueue和ArrayBlockingQueue区别
  - LinkedBlockingQueue 基于链表实现，动态内存、不指定大小时，默认为Integer.MAX_VALUE。生产和消费使用不同Lock锁

  - ArrayBlockingQueue基于数组实现，必须指定大小，固定内存，生产和消费使用同一个锁

  - 吞吐量上lbq更高一些，但是在内存分配、回收上，abq性能要差一些

#### 非阻塞队列

- ConcurrentLinkedQueue：线程安全的、非阻塞的、基于链表实现、无界的队列



# Comparable和Comparator

- 实现Comparable接口，代表该类支持排序
- Comparator 是比较器接口，如果需要控制某个类的排序，且该类不支持排序，可以实现一个该类的比较器



# mysql

#### 		sql执行过程		

- 查询缓存
- 解析和预处理
  - 通过关键字将sql解析，生成解析树。Mysql解析器将使用Mqsql语法规则验证和解析查询。
  - 预处理则根据一些MySQL规则进行进一步检查解析树是否合法，例如检查数据表和数据列是否存在。
- 查询优化
- 执行引擎

#### 脏页

当内存数据页与磁盘数据页数据不一致时，这个内存页称为脏页



# 动态代理

> 动态代理中所说的“动态”，是针对使用Java代码编写了代理类的“静态“代理而言的，它的优势不在于省去了编写代理类那一点编码工作量，而是实现了可以在原始类和接口还未知的情况下，就确定了代理类的行为，当代理类与原始类脱离了直接联系后，就可以很灵活的重用于不同的应用场景之中。



# ThreadGroup

线程组层级：system->main->userGroup（应用程序创建的组）

可以通过线程组管理某些具有特定功能的线程。可以通过线程组对组内线程进行中断等操作



#  二进制安全

只关心二进制的字符串，不关心具体的格式，只会严格的按照二进制的数据存取，不会妄图以某种特殊格式解析数据



# LockSupport









