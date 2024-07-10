# Betavoid Nuke AI

In this repository we release models computing gear using basic AI knowledge. This a POC version and do not use full AI, rather a computational automation of AI procedure to achieve minimal performance. The AI version will discard level computation to use AI reasoning instead.

This model largely depend on 3 principal engines:
- The database of engineering standards - for making assumptions and reasoning about engine variable selections.
- AI engine - for performing computations of gear variables and optimization.
- CAD design - for transforming the gear variables to code for creating CAD designs.

This full pipeline will be maintained in the next iteration except that the computational methodologies will start to fade away to give way to full artificial intelligence for speed and efficiency.


# Requirement:
Essential requirements will be installed automatically on the first run or throw an exception for lack of permission:

- Numpy
- tabulate
- pytorch
- docx
- argparse

Next version [_v1.0.0_](#)  will require to run `setup.py`


## Usage

To use the code, you need to have the user input. The user input need to be in a dictionary format.
It is advisable to save the user input to a py file. See `samples/` for some examples.

Let's assume the user input is `samples/bike.py`.


**This Betavoid Nuke AI code can be run in 3 ways:**

#### 1. On Terminal: 
```bash
    code python main.py --input=samples/bike.py --save_path=outputs/new/ -c -v 
```

where:
> `--input`: takes the path to the user input dictonary

> `--save_path`: takes the path to where to save the outputs

> `-c`: add this flag to save the output code

> `-v`: add this flag to save the computed variables

The file `tool/generator.sh` gives an example


#### 2. Jupyter Notebook
- Run the jupyter notebook (`main.ipynb`) provide to cells that covers all aspect of the code.


#### 3. API
- Use of API to encapsulate the code.



## Disclaimers
Not for other use outside Betavoid POC