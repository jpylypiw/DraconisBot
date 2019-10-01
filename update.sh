#!/bin/bash

systemctl stop draconisbot
git pull
systemctl start draconisbot
