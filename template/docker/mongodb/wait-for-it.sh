#!/bin/bash
# wait-for-it.sh

set -e

host="$1"
shift
cmd="$@"

until mongo --host "$host"; do
  >&2 echo "Mongodb is unavailable - sleeping"
  sleep 1
done

>&2 echo "Mongodb is up - executing command"
exec $cmd