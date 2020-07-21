.SILENT:
.PHONY: android ios

setup:
	@yarn install
	@cd ios && pod install && cd ..
	
reset:
	@watchman watch-del-all
	@cd ios && rm -rf Pods && cd ..
	@cd android && ./gradlew clean && cd ..
	@rm -rf node_modules
	@yarn cache clean

start:
	@yarn start

ios:
	@react-native run-ios

android:
	@react-native run-android
	
open-ios:
	@open ios/Example.xcodeproj

open-android:
	@open -a /Applications/Android\ Studio.app ./android

ios-staging:
	@yarn run-ios-staging

ios-production:
	@ENVFILE=.env.production react-native run-ios

start-rtc:
	# node ./rtc-server/app.js
	@cd rtc-server && node ./app.js