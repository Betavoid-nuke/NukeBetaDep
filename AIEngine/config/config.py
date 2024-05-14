#!/usr/bin/env python
try:
  import argparse
except:
  import subprocess
  subprocess.run(["pip", "install", "argparse"], check=True)
  import argparse


def get_args():
    # parse the args
    print('=> parse the args ...')
    parser = argparse.ArgumentParser(description='Parser for Gear Design')
    parser.add_argument('--input',  type=str, help='dictionary of user inputs')
    parser.add_argument('--save_path', type=str, default=None, help="output filepath")
    parser.add_argument('-c', '--save_code', action='store_true', help='To save the CAD model code')
    parser.add_argument('-v', '--save_var', action='store_true', help='To save the CAD model variables')                        
    return parser