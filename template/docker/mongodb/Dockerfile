FROM centos:latest
LABEL  "lijiasen" <lijiasen@chinacnd.com>
RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai  /etc/localtime
RUN echo '' >> /etc/bashrc \
    && echo 'export LANGUAGE="zh_CN.UTF-8"' >> /etc/bashrc \
    && echo 'export LANG="zh_CN.UTF-8"' >> /etc/bashrc
RUN localedef -c -i zh_CN -f UTF-8 zh_CN.UTF-8

# Installing mongodb
RUN echo $'[repo] \n\
name=MongoDB Repository \n\
baseurl=http://mirrors.aliyun.com/mongodb/yum/redhat/7Server/mongodb-org/3.4/x86_64/ \n\
gpgcheck=0 \n\
enabled=1' > /etc/yum.repos.d/mongodb-org-3.4.repo

RUN yum install -y mongodb-org
RUN mkdir -p /data/db

RUN yum -y install python-setuptools python-setuptools-devel 
RUN easy_install supervisor
RUN mkdir -p /var/log/supervisor

COPY init.js /init.js
RUN chmod 777 /init.js
COPY wait-for-it.sh /wait-for-it.sh
RUN chmod 777 /wait-for-it.sh

COPY conf/supervisor.conf /etc/supervisord.conf
VOLUME ["/data/db"]

EXPOSE 27017
CMD ["/usr/bin/supervisord"]

