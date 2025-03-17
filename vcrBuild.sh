#!/bin/bash
# This script is used to install dependencies and build the app in the machine used by VCR 
# rather than uploading the build built locally
# https://developer.vonage.com/en/vonage-cloud-runtime/guides/manifest#build-script

# run install skipping post install script which requires husky
yarn install --ignore-scripts

yarn build
