Here, the monitors are responsible for listening on specific websites for new posts.

For example, news_api monitor listens on the News API.
If there is any new articles, it will post tasks to message queue and let scrapers to consume the queue and complete the task.
There can be several monitors having different logics.
The way monitors running depends on themselves and the parameters transmitted to them are defined in the configuration file.
