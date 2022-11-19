:a
echo "starting bot"
node bot.js
echo "bot crashed, restarting it."
timeout 5
goto:a