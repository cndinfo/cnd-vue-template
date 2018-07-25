FROM centos:latest
LABEL author="lijiasen@chinacnd.com"
RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai  /etc/localtime
RUN echo '' >> /etc/bashrc \
    && echo 'export LANGUAGE="zh_CN.UTF-8"' >> /etc/bashrc \
    && echo 'export LANG="zh_CN.UTF-8"' >> /etc/bashrc
RUN localedef -c -i zh_CN -f UTF-8 zh_CN.UTF-8

RUN yum -y install epel-release
RUN yum -y install nginx
RUN yum -y install python-setuptools python-setuptools-devel 
RUN easy_install -i https://pypi.tuna.tsinghua.edu.cn/simple supervisor
RUN mkdir -p /var/log/supervisor

COPY nginx.conf /etc/nginx/nginx.conf
COPY conf.d /etc/nginx/conf.d
COPY html  /etc/nginx/html

COPY conf/supervisor.conf /etc/supervisord.conf

EXPOSE 80
CMD ["/usr/bin/supervisord"]