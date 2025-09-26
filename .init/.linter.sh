#!/bin/bash
cd /home/kavia/workspace/code-generation/user-authentication-platform-13518-16581/authentication_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

