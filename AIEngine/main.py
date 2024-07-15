#!/usr/bin/env python
"""
CODE RELEASE TO STARTUP INTEGRATION SUPPORT.
LICENSED FOR COMMERCIAL USE MUST BE OBTAINED FROM THE AUTHOR.
UNAUTHORIZE USE WILL LED TO LEGAL ACTION AND HUGE FINE.
This Code has Been Published Privately on Flask, And Licensed Against External Use.
EVERY LICENSE TO USE THIS CODE REMAINS INVALID WITHOUT WRITTEN AUTHORIZATION FROM THE AUTHOR.
#=============================================================================================
An implementation based on:
***
  Automatic Gear Design from user input prompt
***
Created on Thu Oct 21 15:38:36 2023
#=============================================================================================
Copyright 2023 The CID Research All Rights Reserved.
(c) CID Research LLC in partnership with Betavoid
Designed mantained by AI Research Team, Betavoid Nuke
@ Author: Chinedu Nwoye (Owner)
#==============================================================================================
 Licensed under the Anikputa License, Version 5.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.anikputa.org/licenses/LICENSE-5.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
#==============================================================================
"""

import os
from config import config
from ai_engine.py import gear
from utils import import_file

args = config.get_args().parse_args()
args.input = import_file.get(args.input)
if not args.save_path:
   args.save_path = "./outputs/"

model = gear.GearDesigner()
outputs = model.process(args.input)

try:
    # Let's get the code and save it
    if args.save_code:
        out_file = os.path.join(args.save_path, "output_cad_code.py")
        outputs.code.save(out_file)
finally:
    print("")

# get the code as a single object
out_code = outputs.code
print(out_code.code)

# get the variables as a single object
out_vars = outputs.data

# You can inspect some of the variables
print("Num of Teeth = ", outputs.data.nT)
print("Pressure Angle = ", outputs.data.pa)
print("Force of Safety = ", outputs.data.fos)