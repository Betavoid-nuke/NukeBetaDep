# (c) CID Research LLC in partnership with Betavoid

import os
import sys
import numpy as np
from pathlib import Path


class CodeGen():
    def __init__(self, *args, **kwargs):
        self.CODEBLOCK = []
        self.codefile  = None
        self.compiled  = False

    def addCode(self, *code):
        self.CODEBLOCK.extend(list(code))

    def changeVisibility(self, x=0, y=0, inSelectedView=False, faceLevel=False, visibilityType="hide", selectionType="body"):
        visibility = "VisibilityType.Hide" if visibilityType=="hide" else "VisibilityType.Show"
        if selectionType == "body":
            selection = f"BodySelection.Create(GetRootPart().Bodies[{x}])"
        else:
            selection = f"Selection.Create(GetRootPart().DatumPlanes[{x}].Curves[{y}])"
        self.addCode("",
            "# Change Object Visibility",
            f"selection = {selection}",
            f"visibility = {visibility}",
            f"inSelectedView = {inSelectedView}",
            f"faceLevel = {faceLevel}",
            "ViewHelper.SetObjectVisibility(selection, visibility, inSelectedView, faceLevel)",
            "# EndBlock", "")

    def code(self, vars):
        builder = {
              "A": self.ALPHA,
              "B": self.BETA,
              "P": self.POC,
              "Z": None
          }
        i = "P"
        builder[i](vars) # write the code according to the template def
        self.compiled = True

    def coincidentConstraint(self, x1,y1,z1,x2,y2):
        self.addCode("",
            "# Coincident Constraint",
            f"baseSel = SelectionPoint.Create(GetRootPart().DatumPlanes[{x1}].Curves[{y1}].GetChildren[ICurvePoint]()[{z1}])",
            f"targetSel = SelectionPoint.Create(GetRootPart().DatumPlanes[{x2}].Curves[{y2}])",
            "result = Constraint.CreateCoincident(baseSel, targetSel)",
            "# EndBlock", "")

    def copyItems(self, b=0, f=0, n=0, selection="face"):
        if selection == "face":
            entry = f"FaceSelection.Create(GetRootPart().Bodies[{b}].Faces[{f}])"
        elif selection == "body":
            entry = [f'GetRootPart().Components[0].Components[{j}].Content.Bodies[{b}]' for j in range(n)]
            entry = f"BodySelection.Create({entry})"
        elif selection == "all":
            entry = f"BodySelection.Create(GetRootPart().Components[{b}].GetAllBodies())"
        entry = entry.replace("'",'')
        self.addCode("",
            "# Copy items",
            f"result = Copy.Execute({entry})",
            "# EndBlock","")

    def createKRounds(self, points, m=1, selectionType="edge", curvePoint=-1):
        used  = []
        entry = "["
        for p in points:
            out = f"GetRootPart().Bodies[0].Edges[{p}]"
            if p in used:
                out += ".GetChildren[ICurvePoint]()[2]"
            entry = entry + out +", "
            used.append(p)
        entry = entry + "]"
        if selectionType == "edge":
            selection = f"EdgeSelection.Create({entry})"
        else:
            selection = f"Selection.Create({entry})"
        self.addCode("",
            f"# Create {len(points)} Rounds",
            f"selection = {selection}",
            "options = ConstantRoundOptions()",
            f"result = ConstantRound.Execute(selection, MM({m}), options, None)",
            "# EndBlock", "")

    def create3PointArc(self, x1,y1,z1,x2,y2,z2):
        self.addCode("",
            "# Create Three Point Arc",
            f"point1 = Point2D.Create(MM({x1}), MM({x2}))",
            f"point2 = Point2D.Create(MM({y1}), MM({y2}))",
            f"point3 = Point2D.Create(MM({z1}), MM({z2}))",
            "result = SketchArc.Create3PointArc(point1, point2, point3)",
            "# EndBlock", "")

    def createAngleDimension(self, x1, y1, x2, y2, flipped=True, count="first"):
        if count == "first":
            addon = f".GetChildren[IDatumLine]()[{y1}"
        else:
            addon = f".Curves[{y1}"
        self.addCode("",
            "# Create Angle Dimension",
            f"dimTarget1 = Selection.Create(GetRootPart().DatumPlanes[{x1}]{addon}])",
            f"dimTarget2 = Selection.Create(GetRootPart().DatumPlanes[{x2}].Curves[{y2}])",
            f"flipped = {flipped}",
            "result = Dimension.CreateAngle(dimTarget1, dimTarget2, flipped)",
            "# EndBlock", "")

    def createDatumPlane(self, x=0, y=1, selectionType="selection", rootType="coordinate", is_mirrored=True):
        if rootType == "children":
            entry = f"GetRootPart().GetChildren[IDocObject]()[{x}].Axes[{y}]"
        elif rootType == "coordinate":
            entry = f"GetRootPart().CoordinateSystems[{x}].Axes[{y}]"
        elif rootType == "datum":
            entry = f"GetRootPart().DatumPlanes[{x}].Axes[{y}]"
        elif rootType == "body":
            entry = f"GetRootPart().Bodies[{x}].Faces[{y}]"
        elif rootType == "component":
            entry = f"GetRootPart().Components[{x}].Faces[{y}]"
        else:
            entry = f"GetRootPart().Bodies[{x}].Faces[{y}]"
        if selectionType == "component":
            selection = f"ComponentSelection.Create({entry})"
        elif selectionType == "body":
            selection = f"BodySelection.Create({entry})"
        elif selectionType == "face":
            selection = f"FaceSelection.Create({entry})"
        else:
            selection = f"Selection.Create({entry})"
        self.addCode("",
            "# Create Datum Plane",
            f"selection = {selection}",
            f"result = DatumPlaneCreator.Create(selection, {is_mirrored}, None)",
            "# EndBlock", "")

    def createPattern(self, b, x, y, d1, d2, d3, deg):
        self.addCode("",
            "# Create Pattern",
            f"selection = BodySelection.Create(GetRootPart().Bodies[{b}])",
            "data = CircularPatternData()",
            f"data.CircularAxis = Selection.Create(GetRootPart().CoordinateSystems[{x}].Axes[{y}])",
            f"data.RadialDirection = Direction.Create({d1}, {d2}, {d3})",
            "data.CircularCount = Num_Tooths",
            f"data.CircularAngle = DEG({deg})",
            "result = Pattern.CreateCircular(selection, data, None)",
            "# EndBlock", "")

    def createRound(self, x=0, y=0, selectionType="edge"):
        entry = f"GetRootPart().Bodies[{x}].Edges"
        if selectionType == "edge":
            selection = f"EdgeSelection.Create({entry})"
        else:
            selection = f"Selection.Create({entry})"
        self.addCode("",
            f"# Create Round Edges",
            f"selection = {selection}",
            "options = ConstantRoundOptions()",
            f"result = ConstantRound.Execute(selection, MM({y}), options, None)",
            "# EndBlock", "")

    def deleteObjects(self, x=0, selectionType="component", rootType="children"):
        if rootType == "children":
            entry = f"GetRootPart().GetChildren[IDocObject]()[{x}]"
        elif rootType == "datum":
            entry = f"GetRootPart().DatumPlanes[{x}]"
        elif rootType == "body":
            entry = f"GetRootPart().Bodies[{x}]"
        else:
            entry = f"GetRootPart().Components[{x}]"
        if selectionType == "component":
            selection = f"ComponentSelection.Create({entry})"
        elif selectionType == "body":
            selection = f"BodySelection.Create({entry})"
        else:
            selection = f"Selection.Create({entry})"
        self.addCode("",
            "# Delete Objects",
            f"selection = {selection}",
            "result = Delete.Execute(selection)",
            "# EndBlock", "")

    def editDimension(self, x, y, deg):
        self.addCode("",
            "# Edit dimension",
            f"selDimension = Selection.Create(GetRootPart().DatumPlanes[{x}].GetChildren[IDimension]()[{y}])",
            f"newValue = DEG({deg})",
            "result = Dimension.Modify(selDimension, newValue)",
            "# EndBlock", "")

    def endln(self, space=3):
        self.addCode("#"+"_"*50)

    def extrudeTooth(self, x, y, z, option="add"):
        extrudeType = "ExtrudeType.Cut" if option=="cut" else "ExtrudeType.Add"
        self.addCode("",
            "# Extrude 1 Face",
            f"selection = FaceSelection.Create(GetRootPart().Bodies[{x}].Faces[{y}])",
            "options = ExtrudeFaceOptions()",
            f"options.ExtrudeType = {extrudeType}",
            f"result = ExtrudeFaces.Execute(selection, MM({z}), options)",
            "# EndBlock", "")

    def extrudeBody(self, x1, y1, x2, y2, z1, z2, z3):
        self.addCode("",
            "# Extrude Up To Body",
            f"selection = FaceSelection.Create(GetRootPart().Bodies[{x1}].Faces[{y1}])",
            f"upToSelection = FaceSelection.Create(GetRootPart().Bodies[{x2}].Faces[{y2}])",
            "options = ExtrudeFaceOptions()",
            f"result = ExtrudeFaces.UpTo(selection, Direction.DirY, upToSelection, Point.Create(MM({z1}), MM({z2}), MM({z3})), options)",
            "# EndBlock", "")

    def extrudeTooth2(self, x, y, z, option="add"):
        extrudeType = "ExtrudeType.Cut" if option=="cut" else "ExtrudeType.Add"
        self.addCode("",
            "# Extrude 1 Face",
            f"selection = FaceSelection.Create(GetRootPart().Bodies[{x}].Faces)",
            "options = ExtrudeFaceOptions()",
            f"options.ExtrudeType = {extrudeType}",
            f"result = ExtrudeFaces.Execute(selection, MM({z}), options)",
            "# EndBlock", "")

    def fixedConstraint(self, x, y):
        self.addCode("",
            "# Fixed Constraint",
            f"curveSelList = Selection.Create(GetRootPart().DatumPlanes[{x}].Curves[{y}])",
            "result = Constraint.CreateFixed(curveSelList)",
            "# EndBlock", "")

    def header(self, strings):
        self.addCode("", f"# {strings}","", "#"+"_"*50, "")

    def inch2mm(self, x):
        return x*25.4

    def initialize(self, VAR):
        VAR.pd = self.inch2mm(VAR.pd)
        VAR.md1 = self.inch2mm(VAR.md1)
        VAR.md2 = self.inch2mm(VAR.md2)
        VAR.MD1 = self.inch2mm(VAR.MD1)
        VAR.flr = self.inch2mm(VAR.flr)
        VAR.volume = [self.inch2mm(x) for x in VAR.volume]

        VAR.cc = VAR.md1 + 1.2
        VAR.cm = ((1 - ((79.9-VAR.md1)/79.9))/2) + 1
        VAR.lm = 1 - ((79.9-VAR.md1)/79.9)
        VAR.D = (VAR.pd/VAR.nT) * 2.5

        self.addCode("",
            "# @autoStart",
            f"Num_Tooths = {VAR.nT}", "",
            # f"MD1 = {VAR.MD1}",
            # f"md1 = {VAR.md1}",
            # f"md2 = {VAR.md2}",
            # f"flr = {VAR.flr}",
            # f"pd = {VAR.pd}",
            # f"CC = {VAR.cc}",
            # f"CircleMultiplier = {VAR.cm}",
            # f"LineMultiplier = {VAR.lm}",
            # f"Depth = {VAR.D}", "",
            "# Set Sketch Plane",
            "sectionPlane = Plane.PlaneZX",
            "result = ViewHelper.SetSketchPlane(sectionPlane, None)",
            "# EndBlock", "",
            "# Set New Sketch",
            "result = SketchHelper.StartConstraintSketching()",
            "# EndBlock", "", "#"+"_"*50, "")

    def intersectBodies(self, x, y):
        self.addCode("",
            "# Intersect Bodies",
            f"targets = BodySelection.Create(GetRootPart().Bodies[{x}])",
            f"tools = BodySelection.Create(GetRootPart().Bodies[{y}])",
            "options = MakeSolidsOptions()",
            "result = Combine.Intersect(targets, tools, options)",
            "# EndBlock\n""")

    def mirrorTooth(self, x,y,z=0, mirrorType="face", mirrorRoot="face", selectionType="body", selectionRoot="body"):
        if selectionRoot == "body":
            root = f"GetRootPart().Bodies[{x}]"
        else:
            root = f"GetRootPart().Bodies[{x}]"
        if selectionType == "body":
            selection = f"BodySelection.Create({root})"
        else:
            selection = f"BodySelection.Create({root})"

        if mirrorRoot == "face":
            mroot = f"GetRootPart().Bodies[{y}].Faces[{z}]"
        elif mirrorRoot == "datum":
            mroot = f"GetRootPart().DatumPlanes[{y}]"
        if mirrorType == "face":
            mselect = f"FaceSelection.Create({mroot})"
        else:
            mselect = f"Selection.Create({mroot})"

        self.addCode("",
            "# Mirror",
            f"selection = {selection}",
            f"mirrorPlane = {mselect}",
            "options = MirrorOptions()",
            "result = Mirror.Execute(selection, mirrorPlane, options, None)",
            "# EndBlock","")

    def moveObject(self, x, y, z):
        self.addCode("",
            "# Move Upto Selected Object",
            f"selection = Selection.Create(GetRootPart().DatumPlanes[{x}])",
            f"upToSelection = FaceSelection.Create(GetRootPart().Bodies[{y}].Faces[{z}])",
            "anchorPoint = Move.GetAnchorPoint(selection)",
            "options = MoveOptions()",
            "result = Move.UpTo(selection, upToSelection, anchorPoint, options)",
            "# EndBlock", "")

    def projectToSketch(self, x, y, p1, p2, p3):
        self.addCode("",
            "# Project to Sketch",
            f"selection = EdgeSelection.Create(GetRootPart().Bodies[{x}].Edges[{y}])",
            f"plane = Plane.Create(Frame.Create(Point.Create(MM({p1}), MM({p2}), MM({p3})),",
            "    Direction.DirZ,",
            "    Direction.DirX))",
            "result = ProjectToSketch.Create(selection, plane)",
            "# EndBlock","")

    def save(self, filepath=None):
        if not (filepath or self.codefile):
            sys.exit("Error: No code filepath provided!, ...give the filepath to save the code")
        if filepath:
            self.codefile = Path(filepath).with_suffix(".py")
        os.makedirs(os.path.dirname(self.codefile), exist_ok=True)
        np.savetxt(self.codefile, np.array(self.CODEBLOCK), fmt="%s")
        print("Code save @ ", self.codefile)

    def setNewSketch(self):
        self.addCode("",
            "# Set New Sketch",
            "result = SketchHelper.StartConstraintSketching()",
            "# EndBlock","")

    def setSketchPlane(self, p1,p2,p3, dirx=1, dirz=1):
        dirx = "Direction.DirX"  if dirx > 0 else "-Direction.DirX"
        dirz = "Direction.DirZ"  if dirz > 0 else "-Direction.DirZ"
        self.addCode("",
            "# Set Sketch Plane",
            f"sectionPlane = Plane.Create(Frame.Create(Point.Create(MM({p1}), MM({p2}), MM({p3})),",
            f"{dirz},",
            f"{dirx}))",
            "result = ViewHelper.SetSketchPlane(sectionPlane, None)",
            "# EndBlock","")

    def setSketchPlane2(self, x=0, y=1, rootType="datum"):
        if rootType == "coordinate":
            entry = f"GetRootPart().CoordinateSystems[{x}].Axes[{y}]"
        elif rootType == "datum":
            entry = f"GetRootPart().DatumPlanes[{x}]"
        self.addCode("",
            "# Set Sketch Plane",
            f"selection = Selection.Create({entry})",
            "result = ViewHelper.SetSketchPlane(selection, None)",
            "# EndBlock","")

    def sketchCircle(self, r, x=0, y=0):
        self.addCode("",
            "# Sketch Circle",
            f"origin = Point2D.Create(MM({x}), MM({y}))",
            f"result = SketchCircle.Create(origin, MM({r}))",
            "# EndBlock", "")

    def sketchLine(self, x1=0, y1=0, x2=0, y2=0):
        self.addCode("",
            "# Sketch Line",
            f"start = Point2D.Create(MM({x1}), MM({y1}))",
            f"end = Point2D.Create(MM({x2}), MM({y2}))",
            "result = SketchLine.Create(start, end)",
            "# EndBlock","")

    def sketchLine2(self, p=5, x=0, y=0):
        self.addCode("",
            "# Sketch Line",
            f'z = GetRootPart().DatumPlanes[0].Curves[{p}].EvalEnd().Point.Z',
            f'x = GetRootPart().DatumPlanes[0].Curves[{p}].EvalEnd().Point.X',
            f"start = Point2D.Create(MM({x}), MM({y}))",
            f"end = Point2D.Create(z, x)",
            "result = SketchLine.Create(start, end)",
            "# EndBlock","")

    def sketchRectangle(self, x1=0, x2=0, y1=0, y2=0, z1=0, z2=0):
        self.addCode("",
            "# Sketch Rectangle",
            f"point1 = Point2D.Create(MM({x1}), MM({x2}))",
            f"point2 = Point2D.Create(MM({y1}), MM({y2}))",
            f"point3 = Point2D.Create(MM({z1}), MM({z2}))",
            "result = SketchRectangle.Create(point1, point2, point3)",
            "# EndBlock","")

    def solidifySketch(self):
        self.addCode("",
            "# Solidify Sketch",
            "mode = InteractionMode.Solid",
            "result = ViewHelper.SetViewMode(mode, None)",
            "# EndBlock","")

    def tangentConstraint(self, x1,y1,z1,x2,y2,z2):
        self.addCode("",
            "# Tangent Constraint",
            f"baseSel = SelectionPoint.Create(GetRootPart().DatumPlanes[{x1}].Curves[{y1}], {z1})",
            f"targetSel = SelectionPoint.Create(GetRootPart().DatumPlanes[{x2}].Curves[{y2}], {z2})",
            "result = Constraint.CreateTangent(baseSel, targetSel)",
            "# EndBlock", "")

    def thickenFaces(self, x=1, y=0, d=100):
        self.addCode("",
            "# Thicken 1 Face",
            f"selection = FaceSelection.Create(GetRootPart().Bodies[{x}].Faces[{y}])",
            f"options = ThickenFaceOptions()",
            f"options.PullSymmetric = True",
            f"result = ThickenFaces.Execute(selection, Direction.DirY, MM({d}), options)",
            "# EndBlock","")

    def translateHandle(self, x,y):
        self.addCode("",
            "# Translate Along Z Handle",
            f"selection = Selection.Create(GetRootPart().DatumPlanes[{x}])",
            "direction = Move.GetDirection(selection)",
            "options = MoveOptions()",
            f"result = Move.Translate(selection, direction, MM({y}), options)",
            "# EndBlock", "")

    def trimSketchCurve(self, x,y,z):
        self.addCode("",
            "# Trim Sketch Curve",
            f"curveSelPoint = SelectionPoint.Create(GetRootPart().DatumPlanes[{x}].Curves[{y}], {z})",
            "result = TrimSketchCurve.Execute(curveSelPoint)",
            "# EndBlock","")

    def POC(self, VARS):
        self.header("Python Script, API Version = V21\n# @(auto-generated code)")
        self.initialize(VARS)

        self.header("Sketch Circles, base, pitch, clearancem, and outer")
        # radius = [54.07025, 42.42435, 44.5455675, 50]
        radius = [self.inch2mm(r) for r in [VARS.MD1, VARS.md2, (VARS.md2 + VARS.flr), VARS.pd]]
        for i, r in enumerate(radius):
            self.sketchCircle(r, x=0, y=0)
        self.endln()

        self.header("Will be used to define the cone, left line is the connection of base of the tooth to center and right ride one is 20 degree from left line right line is used to find the intersection of the right line and clearance circle, that is where we will put the curcle that will define the tooth profile")
        lines = [[0, 0, -2*self.inch2mm(VARS.MD1) , 0], [0, 0, -2*self.inch2mm(VARS.MD1), -13.7748545750948], [0, 0, -2*self.inch2mm(VARS.MD1), 12.7693187630313]]
        for line in lines:
            self.sketchLine(x1=line[0], y1=line[1], x2=-1*self.inch2mm(VARS.MD1), y2=line[3])
        self.endln()

        self.header("Just definining the angle of the lines we made above")
        self.createAngleDimension(x1=0, y1=0, x2=0, y2=5, flipped=True, count="first")
        self.createAngleDimension(x1=0, y1=5, x2=0, y2=6, flipped=False, count="other")
        self.editDimension(x=0, y=0, deg='90/Num_Tooths')
        self.editDimension(x=0, y=1, deg=int(360/VARS.nT)) #20
        self.endln()

        self.header("Fixing the circles in place so they won't move when we work on the fillets of the tooth")
        for j in [1,2,3,0]:
            self.fixedConstraint(x=0, y=j)
        self.endln()

        self.header("Fillets for the tooth - This is optional step, we can also make these fillets once the gear is finished, this is one way to do it")
        X = [-43.4896596851415, -1.5*self.inch2mm(VARS.MD1), -52.0524753492041]
        Y = [9.6414254323537, -9.99737968607917, -2.20288415582836]
        R = [17.2740694988181, 1.15878793700168, 1.97118197970336]
        R_edit = [VARS.flr]*3
        for x,y,r in zip(X,Y,R):
            self.sketchCircle(x=x, y=y, r=r)
        self.endln()

        self.header("Setting the constrains of the filled cirdle so they are tengential to the tooth profile circle and the other gear circles we made. important or the profile won't be closed, we do not want any gaps in the profile, if there are gaps in the profile the surface will not be created")
        self.tangentConstraint(x1=0, y1=9, z1=0.0654498469497881, x2=0, y2=7, z2=5.75958653158129)
        self.tangentConstraint(x1=0, y1=9, z1=4.58148928648511, x2=0, y2=0, z2=4.73403887217502)
        self.tangentConstraint(x1=0, y1=8, z1=2.68344372494128, x2=0, y2=1, z2=4.91882160560028)
        self.tangentConstraint(x1=0, y1=8, z1=3.07614280664001, x2=0, y2=7, z2=0)
        self.coincidentConstraint(x1=0, y1=7, z1=0, x2=0, y2=2)
        self.coincidentConstraint(x1=0, y1=7, z1=0, x2=0, y2=6)
        self.endln()

        self.header("We used dimension constrain on the cone, we can not delete the cone or the constrain, which means, we will have to make new cone  buy copy pasting so the angle is same as the first cone. scripts are unable to detele the domensional constrain, so its easy to just copy paste the lines and detele the original ones.")
        self.sketchLine(x1=0, y1=0, x2=-125.484239906968, y2=33.6234007459054)
        self.sketchLine(x1=0, y1=0, x2=-124.186350778703, y2=-10.8648978577903)
        self.changeVisibility(x=0, y=6, inSelectedView=False, faceLevel=False, visibilityType="hide", selectionType="other")
        self.changeVisibility(x=0, y=5, inSelectedView=False, faceLevel=False, visibilityType="hide", selectionType="other")
        self.endln()

        self.header("now we will cut off the extra lines and cirves and all so that we just have 1 closed profile. i used trim tool to trin off the other segments")
        points =[
            [0,4, 0.128039546582595],
            [0,10, 0.125459631425851],
            [0,11, 0.119470675830704],
            [0,10, 0.0233106327660522],
            [0,4, 0.0296552992465702],
            [0,11, 0.0306989924058604],
            [0,1, 4.99241951751062],
            [0,2, 5.01069489294645],
            [0,3, 4.99119811913697],
            [0,0, 5.00710212993558],
            [0,0, 4.32486316929906],
            [0,3, 4.36199226372929],
            [0,2, 4.3741809678016],
            [0,1, 4.39147930166659],
            [0,2, 4.53986310532867],
            [0,1, 4.54235770525386],
            [0,3, 4.54293748370052],
            [0,0, 4.54814125625734],
            [0,7, 4.92794483916467],
            [0,7, 4.31770808181415],
            [0,10, 0.109327082207399],
            [0,7, 0.916317733433619],
            [0,4, 0.0602243393429927],
            [0,7, 0.596136064709212],
            [0,10, 0.0676978025418579],
            [0,7, 0.310810254402109],
            [0,7, 5.66511326126068],
            [0,4, 0.0966219820318238],
            [0,0, 4.78079974706415],
            [0,10, 0.0917022821491142],
            [0,3, 4.79762904229765],
            [0,10, 0.0897469078495702],
            [0,0, 4.76141333958827],
            [0,7, 5.73285702120551],
            [0,9, 4.00316381048672],
            [0,3, 4.78591211727895],
            [0,9, 0.0881719112380244],
            [0,7, 4.67235381546724],
            [0,2, 4.80786039518498],
            [0,2, 4.78846908341776],
            [0,2, 4.79759999719173],
            [0,8, 0.0813675937050609],
            [0,6, 3.30477175661629],
            [0,8, 0.0804105675277094],
            [0,6, 2.5760543775486],
            [0,6, 0.943788997090872],
        ]
        for x,y,z in points:
            result = self.trimSketchCurve(x,y,z)
        self.endln()

        self.header("Now trim is done, and we can convert the progile to surface. this is just existing the skecth mode")
        self.solidifySketch()
        self.endln()

        self.header("Extude the tooth profile")
        vol = self.inch2mm(VARS.volume[-1])
        vol = (self.inch2mm(VARS.pd)/VARS.nT)*10
        self.extrudeTooth(x=0, y=0, z=vol, option="add")
        self.endln()

        self.header("Mirror the tooth, so we have full tooth")
        self.mirrorTooth(x=0, y=0, z=4)
        self.deleteObjects(x=0, selectionType="other", rootType="datum")
        self.endln()

        self.header("using patern tool to make the other 11 tooths, selected the center of the base circle and rotated around it to make other tooths. pattern tool, makes copies of the object around a point or in a line, we can define how many copies.")
        self.createPattern(b=0, x=0, y=1, d1=0, d2=0, d3=0, deg=360)
        self.endln()

        self.header("All the tooth will be in diff folders and we want them all in root, so just copying and pasing them all, and then deleteing all orignal folders")
        self.copyItems(f=0, n=VARS.nT, selection="body")
        self.deleteObjects(x=0, selectionType="component", rootType="component")
        self.deleteObjects(x=-1, selectionType="selection", rootType="children")
        self.endln()


        self.header("Making the rest of the gear, will project the base of the tooth on a plane and then connecting all theprojections so it is a closed circle")
        self.createDatumPlane(x=0, y=1)
        self.translateHandle(x=0, y=vol)
        self.setSketchPlane2(x=0)
        self.setNewSketch()
        self.sketchCircle(r=self.inch2mm(VARS.md2), x=0, y=0)
        self.solidifySketch()
        self.extrudeBody(x1=18, y1=0, x2=2, y2=7, z1=-52.270472154669, z2=0, z3=-65.7622071785207)

        self.header("Optimization")
        m = self.inch2mm(VARS.flr)
        edges = [172, 175, 177, 167, 164, 160, 154, 157, 159, 149, 146, 142, 136, 139, 141, 131, 128, 124, 118, 121, 123, 113, 110, 106, 100, 103, 105, 95, 92, 88, 82, 85, 87, 77, 74, 70, 64, 67, 69, 59, 56, 52, 46, 49, 51, 41, 38, 34, 28, 31, 33, 23, 20, 268, 262, 265, 267, 257, 254, 250, 244, 247, 249, 239, 236, 232, 226, 229, 231, 221, 218, 214, 208, 211, 213, 203, 200, 196, 190, 193, 195, 185, 182, 178, 272, 304, 298, 301, 303, 293, 290, 286, 280, 283, 285, 275, 310, 305, 318, 321, 323, 313, 2, 16, 5, 15, 10, 13]
        self.createKRounds(edges, m=m, selectionType="edge")

        edges = [132, 135, 142, 140, 138, 143, 144, 147, 154, 152, 150, 155, 156, 159, 166, 164, 162, 167, 168, 171, 178, 176, 174, 179, 180, 183, 190, 188, 186, 191, 192, 195, 202, 200, 198, 203, 205, 208, 215, 213, 211, 204, 0, 3, 10, 8, 6, 11, 131, 12, 60, 63, 70, 68, 66, 71, 72, 75, 82, 80, 78, 83, 84, 87, 94, 92, 90, 95, 96, 99, 106, 104, 102, 107, 108, 111, 118, 116, 114, 119, 120, 123, 130, 128, 126, 59, 48, 51, 58, 56, 54, 47, 36, 39, 46, 44, 42, 35, 32, 30, 15, 34, 20, 18, 22, 23, 24, 27]
        self.createKRounds(edges, m=m, selectionType="edge")

        self.deleteObjects(x=0, selectionType="default", rootType="datum")
        self.deleteObjects(x=-1, selectionType="default", rootType="children")

        self.createDatumPlane(x=0, y=6, selectionType="face", rootType="body")
        self.moveObject(x=0, y=0, z=5)
        self.setSketchPlane2(x=0)
        self.setNewSketch()

        #US IF CONDITION HERE TO CHOSE ONE SNIPPET FROM BELOW
        r = self.inch2mm(VARS.md1)/3
        self.sketchCircle(x=4.16333634234434E-14, y=-2.77555756156289E-14, r=r)
        self.solidifySketch()
        # self.extrudeTooth(x=12, y=0, z=-10, option="cut")
        self.extrudeBody(x1=0, y1=325, x2=0, y2=5, z1=-32.0087906931224, z2=0, z3=-44.8579705961346)
        edges = [757,756]
        m = self.inch2mm(VARS.flr)
        self.createKRounds(edges, m=m, selectionType="edge")
        self.deleteObjects(x=0, selectionType="selection", rootType="datum")
        self.endln()
        return

    def ALPHA(self, VARS):
        self.header("Python Script, API Version = V21\n# @(auto-generated code)")
        self.initialize(VARS)

        self.header("Sketch Circles, base, pitch, clearancem, and outer")
        # radius = [54.07025, 42.42435, 44.5455675, 50]
        radius = [self.inch2mm(r) for r in [VARS.MD1, VARS.md1, (VARS.md1 + VARS.flr), VARS.pd]]
        for r in radius:
            self.sketchCircle(r, x=0, y=0)
        self.endln()

        self.header("Will be used to define the cone, left line is the connection of base of the tooth to center and right ride one is 20 degree from left line right line is used to find the intersection of the right line and clearance circle, that is where we will put the curcle that will define the tooth profile")
        lines = [[0, 0, -70.291325, 0], [0, 0, -62.8378855814236, -13.7748545750948], [0, 0, -63.7611611757932, 12.7693187630313]]
        for line in lines:
            self.sketchLine(x1=line[0], y1=line[1], x2=-1*self.inch2mm(VARS.MD1), y2=line[3])
        self.endln()

        self.header("Just definining the angle of the lines we made above")
        self.createAngleDimension(x1=0, y1=0, x2=0, y2=5, flipped=True, count="first")
        self.createAngleDimension(x1=0, y1=5, x2=0, y2=6, flipped=False, count="other")
        self.editDimension(x=0, y=0, deg='90/Num_Tooths')
        self.editDimension(x=0, y=1, deg=int(360/VARS.nT)) #20
        self.endln()

        self.header("Fixing the circles in place so they won't move when we work on the fillets of the tooth")
        for j in [1,2,3,0]:
            self.fixedConstraint(x=0, y=j)
        self.endln()

        self.header("Fillets for the tooth - This is optional step, we can also make these fillets once the gear is finished, this is one way to do it")
        X = [-43.4896596851415, -1.5*self.inch2mm(VARS.MD1), -52.0524753492041]
        Y = [9.6414254323537, -9.99737968607917, -2.20288415582836]
        R = [17.2740694988181, 1.15878793700168, 1.97118197970336]
        R_edit = [VARS.flr]*3
        for x,y,r in zip(X,Y,R):
            self.sketchCircle(x=x, y=y, r=r)
        self.endln()

        self.header("Setting the constrains of the filled cirdle so they are tengential to the tooth profile circle and the other gear circles we made. important or the profile won't be closed, we do not want any gaps in the profile, if there are gaps in the profile the surface will not be created")
        self.tangentConstraint(x1=0, y1=9, z1=0.0654498469497881, x2=0, y2=7, z2=5.75958653158129)
        self.tangentConstraint(x1=0, y1=9, z1=4.58148928648511, x2=0, y2=0, z2=4.73403887217502)
        self.tangentConstraint(x1=0, y1=8, z1=2.68344372494128, x2=0, y2=1, z2=4.91882160560028)
        self.tangentConstraint(x1=0, y1=8, z1=3.07614280664001, x2=0, y2=7, z2=0)
        self.coincidentConstraint(x1=0, y1=7, z1=0, x2=0, y2=2)
        self.coincidentConstraint(x1=0, y1=7, z1=0, x2=0, y2=6)
        self.endln()

        self.header("We used dimension constrain on the cone, we can not delete the cone or the constrain, which means, we will have to make new cone  buy copy pasting so the angle is same as the first cone. scripts are unable to detele the domensional constrain, so its easy to just copy paste the lines and detele the original ones.")
        self.sketchLine(x1=0, y1=0, x2=-72.5745413128057, y2=-8.91103318782257)
        self.sketchLine(x1=0, y1=0, x2=-72.5557050390664, y2=16.7508043782093)
        self.changeVisibility(x=0, y=6, inSelectedView=False, faceLevel=False, visibilityType="hide", selectionType="other")
        self.changeVisibility(x=0, y=5, inSelectedView=False, faceLevel=False, visibilityType="hide", selectionType="other")
        self.endln()

        self.header("now we will cut off the extra lines and cirves and all so that we just have 1 closed profile. i used trim tool to trin off the other segments")
        points =[
            [0,7,0.571385270868013],
            [0,7,0.799491926995221],
            [0,7,1.02766858658475],
            [0,7,1.68551747867453],
            [0,7,2.63836216912653],
            [0,7,2.86687563754399],
            [0,7,3.21262717118205],
            [0,7,3.61733559592656],
            [0,7,4.88044870716779],
            [0,7,5.39657160505675],
            [0,10,0.0311169777753917],
            [0,4,0.0371836741898266],
            [0,11,0.041105771926958],
            [0,11,0.0435470422343369],
            [0,7,5.6451537143784],
            [0,11,0.0474961736259297],
            [0,11,0.0509786004059398],
            [0,11,0.0586016425312255],
            [0,11,0.0667032944726665],
            [0,10,0.0625468337745147],
            [0,11,0.0664084917317954],
            [0,10,0.0523828501269519],
            [0,0,4.82425566935025],
            [0,0,4.85886457929627],
            [0,0,4.66927074214316],
            [0,3,4.61569200327962],
            [0,3,4.43409609754307],
            [0,2,4.52261059935722],
            [0,2,4.39991825019984],
            [0,1,4.45579678727257],
            [0,1,4.59064060081756],
            [0,2,4.92349998913385],
            [0,2,4.89145030296075],
            [0,8,4.37706738824448],
            [0,7,0.0750628795892864],
            [0,10,0.0438566415406214],
            [0,10,0.0451880515423717],
            [0,2,4.82718933899223],
            [0,2,4.84005257891753],
            [0,9,0.0502083893929923],
            [0,2,4.82794110249534],
            [0,2,4.83837553700503],
            [0,7,2.24652618283609],
            [0,2,0.0610754756587988],
        ]
        for x,y,z in points:
            result = self.trimSketchCurve(x,y,z)
        self.endln()

        self.header("Now trim is done, and we can convert the progile to surface. this is just existing the skecth mode")
        self.solidifySketch()
        self.endln()

        self.header("Extude the tooth profile")
        vol = self.inch2mm(VARS.volume[-1])
        vol = (self.inch2mm(VARS.pd)/VARS.nT)*10
        self.extrudeTooth(x=0, y=0, z=vol, option="add")
        self.endln()

        self.header("Mirror the tooth, so we have full tooth")
        self.mirrorTooth(x=0, y=0, z=5)
        self.deleteObjects(x=0, selectionType="other", rootType="datum")
        self.endln()

        self.header("using patern tool to make the other 11 tooths, selected the center of the base circle and rotated around it to make other tooths. pattern tool, makes copies of the object around a point or in a line, we can define how many copies.")
        self.createPattern(b=0, x=0, y=1, d1=0, d2=0, d3=0, deg=360)
        self.endln()

        self.header("All the tooth will be in diff folders and we want them all in root, so just copying and pasing them all, and then deleteing all orignal folders")
        self.copyItems(f=0, n=VARS.nT, selection="body")
        self.deleteObjects(x=0, selectionType="component", rootType="component")
        self.endln()

        self.header("Making the rest of the gear, will project the base of the tooth on a plane and then connecting all theprojections so it is a closed circle")
        p1 = 5.20417042793042E-15
        p2 = 10
        p3 = -47.8610957625897
        project_points = [
            [0,10],
            [11,10],
            [10,10],
            [9,10],
            [8,10],
            [7,10],
            [6,10],
            [5,10],
            [4,10],
            [3,10],
            [2,10],
            [1,10]
            ]
        arc_points = [
                    [7.60514422690618,-13.3896915154608,6.30357332144221,-8.53216276661576,7.18790622597732,-12.1352703269783],
                    [6.30357332144221,8.53216276661576,7.6051442269062,13.3896915154608,6.62939274994899,10.4561060686336],
                    [16.137306993522,28.1678309256867,19.693264836903,31.7237887690677,17.4131994253699,29.5423607986975],
                    [39.3289329959739,41.5575224411475,34.471404247129,40.2559515356835,37.0866175222893,41.1258079833815],
                    [56.3932585292055,41.5575224411475,61.2507872780505,40.2559515356835,58.8606621263906,41.0509405309306],
                    [76.0289266882764,31.7237887690677,79.5848845316574,28.1678309256867,77.5165358049055,30.4972917308639],
                    [88.1170472982732,13.3896915154607,89.4186182037371,8.53216276661574,88.9632691161155,10.508892355487],
                    [88.1170472982732,-13.3896915154608,89.4186182037371,-8.53216276661579,88.5816829738817,-11.9927697702922],
                    [76.0289266882764,-31.7237887690678,79.5848845316574,-28.1678309256868,77.4946579047668,-30.3591414188252],
                    [56.3932585292054,-41.5575224411475,61.2507872780504,-40.2559515356835,58.6355740028903,-41.1258079833815],
                    [34.4714042471289,-40.2559515356835,39.3289329959739,-41.5575224411475,35.9050757391771,-40.7047793032004],
                    [16.1373069935219,-28.1678309256867,19.693264836903,-31.7237887690677,17.377139446204,-29.5641820661663]
                ]
        self.setSketchPlane(p1,p2,p3, dirx=1, dirz=1)
        self.setNewSketch()
        for x,y in project_points:
            self.projectToSketch(x, y, p1, p2, p3)
        for x1,x2,y1,y2,z1,z2 in arc_points:
            self.create3PointArc(x1,y1,z1,x2,y2,z2)
        self.endln()

        self.header("Now exiting the sketchmode and extuding the circle, it will automatically combine all tooths with the circle excute we did")
        self.solidifySketch()
        self.extrudeTooth(x=12, y=0, z=-10, option="cut")
        self.deleteObjects(x=-1, selectionType="other", rootType="children")
        self.endln()

        self.header("Optimization")
        self.header("we need to make fillets on all sharp edges, they are important")
        points1 = [75,72,69,28,80,83,86,99,96,93,90,31,101,105,108,120,117,114,111,34,122,125,128,141,138,135,132,37,143,147,150,162,159,156,153,40,164,167,170,183,180,177,174,43,185,189,192,78,204,262,259,256,57,267,271,274,286,283,280,277,59,0,4,7,20,17,14,11,24,60,63,66,265,221,218,215,50,226,229,232,244,241,238,235,54,246,249,252,224,198,195,198,46,201,206,209,212]
        points2 = [53,129,127,125,28,118,120,122,123,114,112,110,26,104,106,108,109,101,99,97,24,90,92,94,95,86,84,82,22,76,78,80,81,73,71,69,20,62,64,66,67,58,56,54,18,48,50,52,45,43,41,15,9,11,13,14,5,3,1,40,186,188,190,191,183,181,179,38,172,174,176,137,168,166,164,36,158,160,162,177,155,153,151,33,145,147,149,163,142,140,138,30,132,150,134,136]
        self.createKRounds(points=points1, m=1, selectionType="other")
        self.createKRounds(points=points2, m=1, selectionType="edge")
        self.endln()

        self.header("Making a hole in the middle, where the shaft will go, and also appying the fillets on sharp edges. I first created a cirdle and a diff solid then used boolean tool to seperate the intersection part of the circle exture and gear and then deeted the interset part and the circle extude")
        self.setSketchPlane(p1=0, p2=0, p3=0, dirx=1, dirz=-1)
        self.setNewSketch()
        radius_ = 15 # random value for now, just to show the final gear
        self.sketchCircle(x=-1.38777878078145E-14, y=2.77555756156289E-14, r=radius_)
        self.solidifySketch()
        self.deleteObjects(x=-1, selectionType="other", rootType="children")
        self.copyItems(f=290, n=0, selection="face")
        self.changeVisibility(x=0, y=0, inSelectedView=False, faceLevel=False, visibilityType="hide", selectionType="body")
        self.extrudeTooth(x=1, y=0, z=-12, option="cut")
        self.extrudeTooth(x=1, y=2, z=-2, option="add")
        self.changeVisibility(x=0, y=0, inSelectedView=False, faceLevel=False, visibilityType="show", selectionType="body")
        self.intersectBodies(x=0, y=1)
        self.deleteObjects(x=1, selectionType="body", rootType="body")
        self.deleteObjects(x=1, selectionType="body", rootType="body")
        points = [672,673]
        m = 1 # HOW FILET RADIUS? self.inch2mm(VARS.flr)
        self.createKRounds(points, m=m, selectionType="edge")
        self.endln()
        return


    def BETA(self, VARS):
        self.header("Python Script, API Version = V21\n# @(auto-generated code)")
        self.initialize(VARS)

        self.header("Sketch Circles, base, pitch, clearancem, and outer")
        radius = [VARS.MD1, VARS.md1, VARS.cc, VARS.pd]
        for i, r in enumerate(radius):
            self.sketchCircle(r, x=0, y=0)
        self.endln()

        self.header("Will be used to define the cone, left line is the connection of base of the tooth to center and right ride one is 20 degree from left line right line is used to find the intersection of the right line and clearance circle, that is where we will put the curcle that will define the tooth profile")
        const1 = -2.66024246211868
        const2 = -13.7748545750948
        const3 = 12.7693187630313
        lines = [[0, 0, VARS.MD1*const1, 0], [0, 0, VARS.MD1*const1, const2], [0, 0, VARS.MD1*const1, const3]]
        for line in lines:
            self.sketchLine(x1=line[0], y1=line[1], x2=line[2], y2=line[3])
        self.endln()

        self.header("Just definining the angle of the lines we made above")
        self.createAngleDimension(x1=0, y1=0, x2=0, y2=5, flipped=True, count="first")
        self.createAngleDimension(x1=0, y1=5, x2=0, y2=6, flipped=False, count="other")
        self.editDimension(x=0, y=0, deg='90/Num_Tooths - 0.4')
        self.editDimension(x=0, y=1, deg=20) #int(360/VARS.nT)
        self.endln()

        self.header("Fixing the circles in place so they won't move when we work on the fillets of the tooth")
        for j in [1,2,3,0]:
            self.fixedConstraint(x=0, y=j)
        self.endln()

        self.header("Fillets for the tooth - This is optional step, we can also make these fillets once the gear is finished, this is one way to do it")
        X = [-0.9734689*VARS.cc, -1.5074*VARS.MD1, -1.0000770435*VARS.pd]
        Y = [0.215812*VARS.cc, -0.17730*VARS.MD1, -0.0423237*VARS.pd]
        R = [0.306354*VARS.MD1, 0.01*VARS.MD1, 0.01*VARS.MD1]
        for x,y,r in zip(X,Y,R):
            self.sketchCircle(x=x, y=y, r=r)
        self.endln()

        self.header("Setting the constrains of the filled cirdle so they are tengential to the tooth profile circle and the other gear circles we made. important or the profile won't be closed, we do not want any gaps in the profile, if there are gaps in the profile the surface will not be created")
        self.tangentConstraint(x1=0, y1=9, z1=0.0654498469497881, x2=0, y2=7, z2=5.75958653158129)
        self.tangentConstraint(x1=0, y1=9, z1=4.58148928648511, x2=0, y2=0, z2=4.73403887217502)
        self.tangentConstraint(x1=0, y1=8, z1=2.68344372494128, x2=0, y2=1, z2=4.91882160560028)
        self.tangentConstraint(x1=0, y1=8, z1=3.07614280664001, x2=0, y2=7, z2=0)
        self.coincidentConstraint(x1=0, y1=7, z1=0, x2=0, y2=2)
        self.coincidentConstraint(x1=0, y1=7, z1=0, x2=0, y2=6)
        self.endln()

        self.header("We used dimension constrain on the cone, we can not delete the cone or the constrain, which means, we will have to make new cone  buy copy pasting so the angle is same as the first cone. scripts are unable to detele the domensional constrain, so its easy to just copy paste the lines and detele the original ones.")
        self.sketchLine2(p=6, x=0, y=0)
        self.sketchLine2(p=5, x=0, y=0)

        self.changeVisibility(x=0, y=5, inSelectedView=False, faceLevel=False, visibilityType="hide", selectionType="other")
        self.changeVisibility(x=0, y=6, inSelectedView=False, faceLevel=False, visibilityType="hide", selectionType="other")
        self.endln()

        self.header("now we will cut off the extra lines and cirves and all so that we just have 1 closed profile. i used trim tool to trin off the other segments")
        points =[
            [0,4, 0.128039546582595],
            [0,10, 0.125459631425851],
            [0,11, 0.119470675830704],
            [0,10, 0.0],
            [0,4, 0.0],
            [0,11, 0.0],
            [0,1, 4.99241951751062],
            [0,2, 5.01069489294645],
            [0,3, 4.99119811913697],
            [0,0, 5.00710212993558],
            [0,0, 4.32486316929906],
            [0,3, 4.36199226372929],
            [0,2, 4.3741809678016],
            [0,1, 4.39147930166659],
            [0,2, 4.53986310532867],
            [0,1, 4.54235770525386],
            [0,3, 4.54293748370052],
            [0,0, 4.54814125625734],
            [0,7, 4.92794483916467],
            [0,7, 4.31770808181415],
            [0,10, 0.109327082207399*VARS.lm],
            [0,7, 0.916317733433619*VARS.cm],
            [0,4, 0.0602243393429927*VARS.lm],
            [0,7, 0.596136064709212*VARS.cm],
            [0,10, 0.0676978025418579*VARS.lm],
            [0,7, 0.310810254402109*VARS.cm],
        ]
        for x,y,z in points:
            result = self.trimSketchCurve(x,y,z)
        self.endln()

        self.header("Now trim is done, and we can convert the progile to surface. this is just existing the skecth mode")
        self.solidifySketch()
        self.endln()
        self.zcode1()

        self.header("Extude the tooth profile")
        self.extrudeTooth2(x=0, y=0, z=VARS.D, option="add")
        self.endln()
        self.zcode2()

        self.setSketchPlane2(x=0, y=1, rootType="coordinate")
        self.sketchRectangle(x1=-500, x2=-250, y1=300, y2=-250, z1=300, z2=300)
        self.sketchCircle(r=0.306354*VARS.MD1, x=-0.9734689*VARS.cc, y=0.215812*VARS.cc)
        self.sketchCircle(r=VARS.MD1, x=0, y=0)
        self.changeVisibility(x=0, y=0, inSelectedView=False, faceLevel=False, visibilityType="hide", selectionType="body")
        self.solidifySketch()
        self.thickenFaces(x=1, y=0, d=100)
        self.deleteObjects(x=1, selectionType="body", rootType="body")
        self.changeVisibility(x=0, y=0, inSelectedView=False, faceLevel=False, visibilityType="show", selectionType="body")
        self.intersectBodies(x=1, y=0)
        self.deleteObjects(x=0, selectionType="body", rootType="body")
        self.deleteObjects(x=0, selectionType="body", rootType="body")

        self.header("Mirror the tooth, so we have full tooth")
        self.createDatumPlane(x=0, y=0, selectionType="selection", rootType="coordinate", is_mirrored=False)
        self.mirrorTooth(x=0, y=0, z=4, mirrorType="selection", mirrorRoot="datum", selectionType="body", selectionRoot="body")
        self.deleteObjects(x=0, selectionType="selection", rootType="datum")
        self.endln()

        self.header("using patern tool to make the other 11 tooths, selected the center of the base circle and rotated around it to make other tooths. pattern tool, makes copies of the object around a point or in a line, we can define how many copies.")
        self.createPattern(b=0, x=0, y=1, d1=0, d2=0, d3=0, deg=360)
        self.endln()

        self.header("All the tooth will be in different folders and we want them all in root, so just copying and pasing them all, and then deleteing all orignal folders")
        self.copyItems(b=0, selection="all")
        self.deleteObjects(x=0, selectionType="component", rootType="component")
        self.deleteObjects(x=-1, selectionType="selection", rootType="children")
        self.endln()

        self.header("Making the rest of the gear, will project the base of the tooth on a plane and then connecting all theprojections so it is a closed circle")
        self.createDatumPlane(x=0, y=1)
        self.translateHandle(x=0, y=VARS.D)
        self.setSketchPlane2(x=0)
        self.setNewSketch()
        self.sketchCircle(r=VARS.md1, x=0, y=0)
        self.solidifySketch()
        self.extrudeTooth(x=VARS.nT, y=0, z=-VARS.D, option='cut')
        self.endln()

        self.header("Finalizing...")
        self.deleteObjects(x=0, selectionType="selection", rootType="datum")
        self.deleteObjects(x=-1, selectionType="selection", rootType="children")
        self.createDatumPlane(x=0, y=1, rootType="coordinate", is_mirrored=False)
        self.setSketchPlane2(x=0, rootType="datum")
        self.sketchCircle(r=VARS.MD1/4, x=0, y=0)
        self.changeVisibility(x=0, y=0, inSelectedView=False, faceLevel=False, visibilityType="hide", selectionType="body")
        self.solidifySketch()
        self.thickenFaces(x=1, y=0, d=200)
        self.changeVisibility(x=0, y=0, inSelectedView=False, faceLevel=False, visibilityType="show", selectionType="body")
        self.deleteObjects(x=0, selectionType="selection", rootType="datum")
        self.intersectBodies(x=0, y=1)
        self.deleteObjects(x=1, selectionType="body", rootType="body")
        self.deleteObjects(x=1, selectionType="body", rootType="body")
        self.createRound(x=0, y=VARS.flr, selectionType="edge")
        self.endln()
        return


    def zcode1(self):
        self.addCode("",
            "for i in range(5):",
            "    try:",
            "       selection = Selection.Create(GetRootPart().GetChildren[IDocObject]()[-1])",
            "       result = Delete.Execute(selection)",
            "    except Exception as e:",
            '        print "."', "")


    def zcode2(self):
        self.addCode("",
        "# deleteing everything except the tooth",
        "for i in range(1,5):",
        "    try:",
        "        selection = BodySelection.Create(GetRootPart().Bodies[i])",
        "        result = Delete.Execute(selection)",
        "    except Exception as e:",
        '        print "."',"")



