#!/bin/bash

# Define the minimum required Python version
minimum_version="3.7"

# Get the installed Python version (more robust method)
python_version=$(python3 --version 2>/dev/null | sed -En 's/Python ([0-9]+\.[0-9]+).*/\1/p')

# Check if Python 3 is installed
if [ -z "$python_version" ]; then
  echo "Python 3 is not installed. Please install Python 3.7 or later."
  echo "For macOS, you can use Homebrew: brew install python3"
  echo "For Linux (Debian/Ubuntu), you can use apt: sudo apt install python3"
  echo "For other distributions or operating systems, refer to the official Python website: https://www.python.org/downloads/"
  exit 1
fi

# Compare versions
if [[ $(printf '%s\n' "$python_version" "$minimum_version" | sort -V | head -n 1) != "$minimum_version" ]]; then
  echo "The installed Python version ($python_version) is lower than the minimum required version ($minimum_version)."
  echo "Please install Python $minimum_version or later."
  echo "For macOS, you can use Homebrew: brew install python3"
  echo "For Linux (Debian/Ubuntu), you can use apt: sudo apt install python3"
  echo "For other distributions or operating systems, refer to the official Python website: https://www.python.org/downloads/"
  exit 1
fi

# Start the HTTP server
echo "Starting HTTP server on port 8080..."
python3 -m http.server 8080