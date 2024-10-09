#!/bin/bash
# Prune all merged branches except for main
git branch --merged | grep -v "^\*\\|main" | xargs -n 1 git branch -d
