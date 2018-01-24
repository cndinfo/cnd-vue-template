FROM centos:latest
LABEL "lijiasen" <lijiasen@chinacnd.com>
RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai  /etc/localtime
RUN echo '' >> /etc/bashrc \
    && echo 'export LANGUAGE="zh_CN.UTF-8"' >> /etc/bashrc \
    && echo 'export LANG="zh_CN.UTF-8"' >> /etc/bashrc
RUN localedef -c -i zh_CN -f UTF-8 zh_CN.UTF-8


RUN yum install -y wget tar make gcc-c++ bzip2
RUN mkdir /apps
WORKDIR /apps


# Installing node.js
ENV NODE_VERSION 8.9.3
ENV ARCH x64

RUN   wget http://cdn.npm.taobao.org/dist/node/v$NODE_VERSION/node-v$NODE_VERSION-linux-$ARCH.tar.xz \
  && tar -xJf "node-v$NODE_VERSION-linux-$ARCH.tar.xz" -C /usr/local --strip-components=1 \
  && rm "node-v$NODE_VERSION-linux-$ARCH.tar.xz"  \
  && ln -s /usr/local/bin/node /usr/local/bin/nodejs

# chromedriver 二进制包镜像
RUN npm set chromedriver_cdnurl http://cdn.npm.taobao.org/dist/chromedriver
# phantomjs 二进制包镜像
RUN npm set phantomjs_cdnurl http://cdn.npm.taobao.org/dist/phantomjs
# node-sass 二进制包镜像
RUN npm set sass_binary_site http://cdn.npm.taobao.org/dist/node-sass

RUN npm config set registry https://registry.npm.taobao.org


RUN yum -y install python-setuptools python-setuptools-devel
RUN easy_install supervisor
RUN mkdir -p /var/log/supervisor

COPY package.json /tmp/package.json
RUN cd /tmp && npm install
RUN cp -a /tmp/node_modules /apps/

WORKDIR /apps
COPY . /apps

COPY docker/conf/supervisor.conf /etc/supervisord.conf

EXPOSE 20 21 22 3000 9001 27017
CMD ["/usr/bin/supervisord"]
