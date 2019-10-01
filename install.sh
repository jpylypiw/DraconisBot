#!/bin/bash

SERVICEFILE="/lib/systemd/system/draconisbot.service"
INSTALLDIR=$(pwd)

/usr/bin/env npm install

read -r -d '' SERVICECONTENT <<EOF
[Unit]
Description=DraconisBot - great Discord Bot
Wants=network-online.target
After=syslog.target time-sync.target network.target network-online.target

[Service]
ExecStart=/usr/bin/node .
WorkingDirectory=$INSTALLDIR
Restart=always
RestartSec=10
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=draconisbot
User=root
Group=root

[Install]
WantedBy=multi-user.target
EOF

touch $SERVICEFILE
echo "$SERVICECONTENT" >$SERVICEFILE

systemctl daemon-reload
systemctl enable draconisbot
