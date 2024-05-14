
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

"""setup.py for betavoid_nuke_ai repo, poc package."""

import os
from setuptools import find_packages
from setuptools import setup


here = os.path.abspath(os.path.dirname(__file__))
try:
  README = open(os.path.join(here, 'README.md'), encoding='utf-8').read()
except IOError:
  README = ''

install_requires = [
    'absl-py',
    'aqtp!=0.1.1', 
    'clu',
    'einops',
    'flax',
    'flaxformer',
    'jax',
    'ml-collections',
    'numpy',
    'packaging',
    'pandas',
    'scipy',
    'torch',
    'torchvision',
    'torchaudio',
    'tensorflow_datasets',
    'tensorflow_probability',
    'tensorflow',
    'tensorflow_text',
    'tqdm',
]

tests_require = [
    'pytest',
]

__version__ = None

with open(os.path.join(here, 'version.py')) as f:
  exec(f.read(), globals())  # pylint: disable=exec-used

setup(
    name='betai',
    version=__version__,
    description='Original JAX implementation of Betavoid Nuke AI models.',
    long_description=README,
    long_description_content_type='text/markdown',
    classifiers=[
        'Development Status :: 3 - Alpha',
        'Intended Audience :: Developers',
        'Intended Audience :: Science/Research',
        'License :: OSI Approved :: Apache Software License',
        'Programming Language :: Python :: 3.7',
        'Topic :: Scientific/Engineering :: Artificial Intelligence',
        ],
    keywords='',
    author='Betavoid Nuke AI Authors',
    author_email='no-reply@betavoid.com',
    url='https://github.com/Betavoid-AI',
    packages=find_packages(),
    zip_safe=False,
    install_requires=install_requires,
    tests_require=tests_require,
    extras_require=dict(test=tests_require),
    )