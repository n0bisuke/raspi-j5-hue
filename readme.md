
## 自動起動

```
sudo vim /etc/rc.local
```

```
# Print the IP address
_IP=$(hostname -I) || true
if [ "$_IP" ]; then
  printf "My IP address is %s\n" "$_IP"
fi

##追記
sudo -u pi /home/pi/.nvm/versions/node/v4.4.2/bin/node /home/pi/MyNodeApp/raspi-j5-hue/ip.js

exit 0
```


## スクリプトのパーミッション

```
chrmod 744 nodejs.sh
```