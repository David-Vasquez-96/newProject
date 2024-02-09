#!/bin/bash
"/var/opt/sonar-scanner-4.2.0.1873-linux/bin/sonar-scanner" \
-Dsonar.login=0ddbe34e15b119ffc9f525749b17f43aa09decd8 \
-Dsonar.host.url=http://localhost:5010 \
-Dsonar.coverage.exclusions=.git \
-Dsonar.java.binaries=.git,node_modules \
-Dsonar.sources=src \
-Dsonar.projectName=tse_external_web \
-Dsonar.projectKey=tse_external_web \
-X

