FROM centos:latest
LABEL "lijiasen" <lijiasen@chinacnd.com> \
	Usage="docker run -d -p [HOST PORT NUMBER]:21 -v [HOST FTP HOME]:/home/vsftpd fauria/vsftpd" \
	Version="1.0"
RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai  /etc/localtime
RUN echo '' >> /etc/bashrc \
    && echo 'export LANGUAGE="zh_CN.UTF-8"' >> /etc/bashrc \
    && echo 'export LANG="zh_CN.UTF-8"' >> /etc/bashrc
RUN localedef -c -i zh_CN -f UTF-8 zh_CN.UTF-8

# FTP服务器
RUN yum -y install vsftpd db4-utils db4

ENV FTP_USER **String**
ENV FTP_PASS **Random**
ENV PASV_ADDRESS **IPv4**
ENV PASV_MIN_PORT 21100
ENV PASV_MAX_PORT 21110
ENV LOG_STDOUT **Boolean**

COPY conf/vsftpd.conf /etc/vsftpd/
COPY conf/vsftpd_virtual /etc/pam.d/
COPY conf/run-vsftpd.sh /usr/sbin/

RUN chmod +x /usr/sbin/run-vsftpd.sh
RUN mkdir -p /home/vsftpd/
RUN chown -R ftp:ftp /home/vsftpd/

RUN yum -y install python-setuptools python-setuptools-devel 
RUN easy_install supervisor
COPY conf/supervisor.conf /etc/supervisord.conf


ENTRYPOINT ["/usr/sbin/run-vsftpd.sh"]

VOLUME /home/vsftpd
VOLUME /var/log/vsftpd

EXPOSE 20 21 22 9001  
CMD ["/usr/bin/supervisord"]

