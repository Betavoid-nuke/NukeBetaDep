
# Python Script, API Version = V21
# @(auto-generated code)

#__________________________________________________


# @autoStart
Num_Tooths = 18

# Set Sketch Plane
sectionPlane = Plane.PlaneZX
result = ViewHelper.SetSketchPlane(sectionPlane, None)
# EndBlock

# Set New Sketch
result = SketchHelper.StartConstraintSketching()
# EndBlock

#__________________________________________________


# Sketch Circles, base, pitch, clearancem, and outer

#__________________________________________________


# Sketch Circle
origin = Point2D.Create(MM(0), MM(0))
result = SketchCircle.Create(origin, MM(2413.0))
# EndBlock


# Sketch Circle
origin = Point2D.Create(MM(0), MM(0))
result = SketchCircle.Create(origin, MM(2031.9999999999995))
# EndBlock


# Sketch Circle
origin = Point2D.Create(MM(0), MM(0))
result = SketchCircle.Create(origin, MM(2070.0999999999995))
# EndBlock


# Sketch Circle
origin = Point2D.Create(MM(0), MM(0))
result = SketchCircle.Create(origin, MM(2286.0))
# EndBlock

#__________________________________________________

# Will be used to define the cone, left line is the connection of base of the tooth to center and right ride one is 20 degree from left line right line is used to find the intersection of the right line and clearance circle, that is where we will put the curcle that will define the tooth profile

#__________________________________________________


# Sketch Line
start = Point2D.Create(MM(0), MM(0))
end = Point2D.Create(MM(-2413.0), MM(0))
result = SketchLine.Create(start, end)
# EndBlock


# Sketch Line
start = Point2D.Create(MM(0), MM(0))
end = Point2D.Create(MM(-2413.0), MM(-13.7748545750948))
result = SketchLine.Create(start, end)
# EndBlock


# Sketch Line
start = Point2D.Create(MM(0), MM(0))
end = Point2D.Create(MM(-2413.0), MM(12.7693187630313))
result = SketchLine.Create(start, end)
# EndBlock

#__________________________________________________

# Just definining the angle of the lines we made above

#__________________________________________________


# Create Angle Dimension
dimTarget1 = Selection.Create(GetRootPart().DatumPlanes[0].GetChildren[IDatumLine]()[0])
dimTarget2 = Selection.Create(GetRootPart().DatumPlanes[0].Curves[5])
flipped = True
result = Dimension.CreateAngle(dimTarget1, dimTarget2, flipped)
# EndBlock


# Create Angle Dimension
dimTarget1 = Selection.Create(GetRootPart().DatumPlanes[0].Curves[5])
dimTarget2 = Selection.Create(GetRootPart().DatumPlanes[0].Curves[6])
flipped = False
result = Dimension.CreateAngle(dimTarget1, dimTarget2, flipped)
# EndBlock


# Edit dimension
selDimension = Selection.Create(GetRootPart().DatumPlanes[0].GetChildren[IDimension]()[0])
newValue = DEG(90/Num_Tooths)
result = Dimension.Modify(selDimension, newValue)
# EndBlock


# Edit dimension
selDimension = Selection.Create(GetRootPart().DatumPlanes[0].GetChildren[IDimension]()[1])
newValue = DEG(20)
result = Dimension.Modify(selDimension, newValue)
# EndBlock

#__________________________________________________

# Fixing the circles in place so they won't move when we work on the fillets of the tooth

#__________________________________________________


# Fixed Constraint
curveSelList = Selection.Create(GetRootPart().DatumPlanes[0].Curves[1])
result = Constraint.CreateFixed(curveSelList)
# EndBlock


# Fixed Constraint
curveSelList = Selection.Create(GetRootPart().DatumPlanes[0].Curves[2])
result = Constraint.CreateFixed(curveSelList)
# EndBlock


# Fixed Constraint
curveSelList = Selection.Create(GetRootPart().DatumPlanes[0].Curves[3])
result = Constraint.CreateFixed(curveSelList)
# EndBlock


# Fixed Constraint
curveSelList = Selection.Create(GetRootPart().DatumPlanes[0].Curves[0])
result = Constraint.CreateFixed(curveSelList)
# EndBlock

#__________________________________________________

# Fillets for the tooth - This is optional step, we can also make these fillets once the gear is finished, this is one way to do it

#__________________________________________________


# Sketch Circle
origin = Point2D.Create(MM(-43.4896596851415), MM(9.6414254323537))
result = SketchCircle.Create(origin, MM(17.2740694988181))
# EndBlock


# Sketch Circle
origin = Point2D.Create(MM(-3619.5), MM(-9.99737968607917))
result = SketchCircle.Create(origin, MM(1.15878793700168))
# EndBlock


# Sketch Circle
origin = Point2D.Create(MM(-52.0524753492041), MM(-2.20288415582836))
result = SketchCircle.Create(origin, MM(1.97118197970336))
# EndBlock

#__________________________________________________

# Setting the constrains of the filled cirdle so they are tengential to the tooth profile circle and the other gear circles we made. important or the profile won't be closed, we do not want any gaps in the profile, if there are gaps in the profile the surface will not be created

#__________________________________________________


# Tangent Constraint
baseSel = SelectionPoint.Create(GetRootPart().DatumPlanes[0].Curves[9], 0.0654498469497881)
targetSel = SelectionPoint.Create(GetRootPart().DatumPlanes[0].Curves[7], 5.75958653158129)
result = Constraint.CreateTangent(baseSel, targetSel)
# EndBlock


# Tangent Constraint
baseSel = SelectionPoint.Create(GetRootPart().DatumPlanes[0].Curves[9], 4.58148928648511)
targetSel = SelectionPoint.Create(GetRootPart().DatumPlanes[0].Curves[0], 4.73403887217502)
result = Constraint.CreateTangent(baseSel, targetSel)
# EndBlock


# Tangent Constraint
baseSel = SelectionPoint.Create(GetRootPart().DatumPlanes[0].Curves[8], 2.68344372494128)
targetSel = SelectionPoint.Create(GetRootPart().DatumPlanes[0].Curves[1], 4.91882160560028)
result = Constraint.CreateTangent(baseSel, targetSel)
# EndBlock


# Tangent Constraint
baseSel = SelectionPoint.Create(GetRootPart().DatumPlanes[0].Curves[8], 3.07614280664001)
targetSel = SelectionPoint.Create(GetRootPart().DatumPlanes[0].Curves[7], 0)
result = Constraint.CreateTangent(baseSel, targetSel)
# EndBlock


# Coincident Constraint
baseSel = SelectionPoint.Create(GetRootPart().DatumPlanes[0].Curves[7].GetChildren[ICurvePoint]()[0])
targetSel = SelectionPoint.Create(GetRootPart().DatumPlanes[0].Curves[2])
result = Constraint.CreateCoincident(baseSel, targetSel)
# EndBlock


# Coincident Constraint
baseSel = SelectionPoint.Create(GetRootPart().DatumPlanes[0].Curves[7].GetChildren[ICurvePoint]()[0])
targetSel = SelectionPoint.Create(GetRootPart().DatumPlanes[0].Curves[6])
result = Constraint.CreateCoincident(baseSel, targetSel)
# EndBlock

#__________________________________________________

# We used dimension constrain on the cone, we can not delete the cone or the constrain, which means, we will have to make new cone  buy copy pasting so the angle is same as the first cone. scripts are unable to detele the domensional constrain, so its easy to just copy paste the lines and detele the original ones.

#__________________________________________________


# Sketch Line
start = Point2D.Create(MM(0), MM(0))
end = Point2D.Create(MM(-125.484239906968), MM(33.6234007459054))
result = SketchLine.Create(start, end)
# EndBlock


# Sketch Line
start = Point2D.Create(MM(0), MM(0))
end = Point2D.Create(MM(-124.186350778703), MM(-10.8648978577903))
result = SketchLine.Create(start, end)
# EndBlock


# Change Object Visibility
selection = Selection.Create(GetRootPart().DatumPlanes[0].Curves[6])
visibility = VisibilityType.Hide
inSelectedView = False
faceLevel = False
ViewHelper.SetObjectVisibility(selection, visibility, inSelectedView, faceLevel)
# EndBlock


# Change Object Visibility
selection = Selection.Create(GetRootPart().DatumPlanes[0].Curves[5])
visibility = VisibilityType.Hide
inSelectedView = False
faceLevel = False
ViewHelper.SetObjectVisibility(selection, visibility, inSelectedView, faceLevel)
# EndBlock

#__________________________________________________

# now we will cut off the extra lines and cirves and all so that we just have 1 closed profile. i used trim tool to trin off the other segments

#__________________________________________________


# Trim Sketch Curve
curveSelPoint = SelectionPoint.Create(GetRootPart().DatumPlanes[0].Curves[4], 0.128039546582595)
result = TrimSketchCurve.Execute(curveSelPoint)
# EndBlock


# Trim Sketch Curve
curveSelPoint = SelectionPoint.Create(GetRootPart().DatumPlanes[0].Curves[10], 0.125459631425851)
result = TrimSketchCurve.Execute(curveSelPoint)
# EndBlock


# Trim Sketch Curve
curveSelPoint = SelectionPoint.Create(GetRootPart().DatumPlanes[0].Curves[11], 0.119470675830704)
result = TrimSketchCurve.Execute(curveSelPoint)
# EndBlock


# Trim Sketch Curve
curveSelPoint = SelectionPoint.Create(GetRootPart().DatumPlanes[0].Curves[10], 0.0233106327660522)
result = TrimSketchCurve.Execute(curveSelPoint)
# EndBlock


# Trim Sketch Curve
curveSelPoint = SelectionPoint.Create(GetRootPart().DatumPlanes[0].Curves[4], 0.0296552992465702)
result = TrimSketchCurve.Execute(curveSelPoint)
# EndBlock


# Trim Sketch Curve
curveSelPoint = SelectionPoint.Create(GetRootPart().DatumPlanes[0].Curves[11], 0.0306989924058604)
result = TrimSketchCurve.Execute(curveSelPoint)
# EndBlock


# Trim Sketch Curve
curveSelPoint = SelectionPoint.Create(GetRootPart().DatumPlanes[0].Curves[1], 4.99241951751062)
result = TrimSketchCurve.Execute(curveSelPoint)
# EndBlock


# Trim Sketch Curve
curveSelPoint = SelectionPoint.Create(GetRootPart().DatumPlanes[0].Curves[2], 5.01069489294645)
result = TrimSketchCurve.Execute(curveSelPoint)
# EndBlock


# Trim Sketch Curve
curveSelPoint = SelectionPoint.Create(GetRootPart().DatumPlanes[0].Curves[3], 4.99119811913697)
result = TrimSketchCurve.Execute(curveSelPoint)
# EndBlock


# Trim Sketch Curve
curveSelPoint = SelectionPoint.Create(GetRootPart().DatumPlanes[0].Curves[0], 5.00710212993558)
result = TrimSketchCurve.Execute(curveSelPoint)
# EndBlock


# Trim Sketch Curve
curveSelPoint = SelectionPoint.Create(GetRootPart().DatumPlanes[0].Curves[0], 4.32486316929906)
result = TrimSketchCurve.Execute(curveSelPoint)
# EndBlock


# Trim Sketch Curve
curveSelPoint = SelectionPoint.Create(GetRootPart().DatumPlanes[0].Curves[3], 4.36199226372929)
result = TrimSketchCurve.Execute(curveSelPoint)
# EndBlock


# Trim Sketch Curve
curveSelPoint = SelectionPoint.Create(GetRootPart().DatumPlanes[0].Curves[2], 4.3741809678016)
result = TrimSketchCurve.Execute(curveSelPoint)
# EndBlock


# Trim Sketch Curve
curveSelPoint = SelectionPoint.Create(GetRootPart().DatumPlanes[0].Curves[1], 4.39147930166659)
result = TrimSketchCurve.Execute(curveSelPoint)
# EndBlock


# Trim Sketch Curve
curveSelPoint = SelectionPoint.Create(GetRootPart().DatumPlanes[0].Curves[2], 4.53986310532867)
result = TrimSketchCurve.Execute(curveSelPoint)
# EndBlock


# Trim Sketch Curve
curveSelPoint = SelectionPoint.Create(GetRootPart().DatumPlanes[0].Curves[1], 4.54235770525386)
result = TrimSketchCurve.Execute(curveSelPoint)
# EndBlock


# Trim Sketch Curve
curveSelPoint = SelectionPoint.Create(GetRootPart().DatumPlanes[0].Curves[3], 4.54293748370052)
result = TrimSketchCurve.Execute(curveSelPoint)
# EndBlock


# Trim Sketch Curve
curveSelPoint = SelectionPoint.Create(GetRootPart().DatumPlanes[0].Curves[0], 4.54814125625734)
result = TrimSketchCurve.Execute(curveSelPoint)
# EndBlock


# Trim Sketch Curve
curveSelPoint = SelectionPoint.Create(GetRootPart().DatumPlanes[0].Curves[7], 4.92794483916467)
result = TrimSketchCurve.Execute(curveSelPoint)
# EndBlock


# Trim Sketch Curve
curveSelPoint = SelectionPoint.Create(GetRootPart().DatumPlanes[0].Curves[7], 4.31770808181415)
result = TrimSketchCurve.Execute(curveSelPoint)
# EndBlock


# Trim Sketch Curve
curveSelPoint = SelectionPoint.Create(GetRootPart().DatumPlanes[0].Curves[10], 0.109327082207399)
result = TrimSketchCurve.Execute(curveSelPoint)
# EndBlock


# Trim Sketch Curve
curveSelPoint = SelectionPoint.Create(GetRootPart().DatumPlanes[0].Curves[7], 0.916317733433619)
result = TrimSketchCurve.Execute(curveSelPoint)
# EndBlock


# Trim Sketch Curve
curveSelPoint = SelectionPoint.Create(GetRootPart().DatumPlanes[0].Curves[4], 0.0602243393429927)
result = TrimSketchCurve.Execute(curveSelPoint)
# EndBlock


# Trim Sketch Curve
curveSelPoint = SelectionPoint.Create(GetRootPart().DatumPlanes[0].Curves[7], 0.596136064709212)
result = TrimSketchCurve.Execute(curveSelPoint)
# EndBlock


# Trim Sketch Curve
curveSelPoint = SelectionPoint.Create(GetRootPart().DatumPlanes[0].Curves[10], 0.0676978025418579)
result = TrimSketchCurve.Execute(curveSelPoint)
# EndBlock


# Trim Sketch Curve
curveSelPoint = SelectionPoint.Create(GetRootPart().DatumPlanes[0].Curves[7], 0.310810254402109)
result = TrimSketchCurve.Execute(curveSelPoint)
# EndBlock


# Trim Sketch Curve
curveSelPoint = SelectionPoint.Create(GetRootPart().DatumPlanes[0].Curves[7], 5.66511326126068)
result = TrimSketchCurve.Execute(curveSelPoint)
# EndBlock


# Trim Sketch Curve
curveSelPoint = SelectionPoint.Create(GetRootPart().DatumPlanes[0].Curves[4], 0.0966219820318238)
result = TrimSketchCurve.Execute(curveSelPoint)
# EndBlock


# Trim Sketch Curve
curveSelPoint = SelectionPoint.Create(GetRootPart().DatumPlanes[0].Curves[0], 4.78079974706415)
result = TrimSketchCurve.Execute(curveSelPoint)
# EndBlock


# Trim Sketch Curve
curveSelPoint = SelectionPoint.Create(GetRootPart().DatumPlanes[0].Curves[10], 0.0917022821491142)
result = TrimSketchCurve.Execute(curveSelPoint)
# EndBlock


# Trim Sketch Curve
curveSelPoint = SelectionPoint.Create(GetRootPart().DatumPlanes[0].Curves[3], 4.79762904229765)
result = TrimSketchCurve.Execute(curveSelPoint)
# EndBlock


# Trim Sketch Curve
curveSelPoint = SelectionPoint.Create(GetRootPart().DatumPlanes[0].Curves[10], 0.0897469078495702)
result = TrimSketchCurve.Execute(curveSelPoint)
# EndBlock


# Trim Sketch Curve
curveSelPoint = SelectionPoint.Create(GetRootPart().DatumPlanes[0].Curves[0], 4.76141333958827)
result = TrimSketchCurve.Execute(curveSelPoint)
# EndBlock


# Trim Sketch Curve
curveSelPoint = SelectionPoint.Create(GetRootPart().DatumPlanes[0].Curves[7], 5.73285702120551)
result = TrimSketchCurve.Execute(curveSelPoint)
# EndBlock


# Trim Sketch Curve
curveSelPoint = SelectionPoint.Create(GetRootPart().DatumPlanes[0].Curves[9], 4.00316381048672)
result = TrimSketchCurve.Execute(curveSelPoint)
# EndBlock


# Trim Sketch Curve
curveSelPoint = SelectionPoint.Create(GetRootPart().DatumPlanes[0].Curves[3], 4.78591211727895)
result = TrimSketchCurve.Execute(curveSelPoint)
# EndBlock


# Trim Sketch Curve
curveSelPoint = SelectionPoint.Create(GetRootPart().DatumPlanes[0].Curves[9], 0.0881719112380244)
result = TrimSketchCurve.Execute(curveSelPoint)
# EndBlock


# Trim Sketch Curve
curveSelPoint = SelectionPoint.Create(GetRootPart().DatumPlanes[0].Curves[7], 4.67235381546724)
result = TrimSketchCurve.Execute(curveSelPoint)
# EndBlock


# Trim Sketch Curve
curveSelPoint = SelectionPoint.Create(GetRootPart().DatumPlanes[0].Curves[2], 4.80786039518498)
result = TrimSketchCurve.Execute(curveSelPoint)
# EndBlock


# Trim Sketch Curve
curveSelPoint = SelectionPoint.Create(GetRootPart().DatumPlanes[0].Curves[2], 4.78846908341776)
result = TrimSketchCurve.Execute(curveSelPoint)
# EndBlock


# Trim Sketch Curve
curveSelPoint = SelectionPoint.Create(GetRootPart().DatumPlanes[0].Curves[2], 4.79759999719173)
result = TrimSketchCurve.Execute(curveSelPoint)
# EndBlock


# Trim Sketch Curve
curveSelPoint = SelectionPoint.Create(GetRootPart().DatumPlanes[0].Curves[8], 0.0813675937050609)
result = TrimSketchCurve.Execute(curveSelPoint)
# EndBlock


# Trim Sketch Curve
curveSelPoint = SelectionPoint.Create(GetRootPart().DatumPlanes[0].Curves[6], 3.30477175661629)
result = TrimSketchCurve.Execute(curveSelPoint)
# EndBlock


# Trim Sketch Curve
curveSelPoint = SelectionPoint.Create(GetRootPart().DatumPlanes[0].Curves[8], 0.0804105675277094)
result = TrimSketchCurve.Execute(curveSelPoint)
# EndBlock


# Trim Sketch Curve
curveSelPoint = SelectionPoint.Create(GetRootPart().DatumPlanes[0].Curves[6], 2.5760543775486)
result = TrimSketchCurve.Execute(curveSelPoint)
# EndBlock


# Trim Sketch Curve
curveSelPoint = SelectionPoint.Create(GetRootPart().DatumPlanes[0].Curves[6], 0.943788997090872)
result = TrimSketchCurve.Execute(curveSelPoint)
# EndBlock

#__________________________________________________

# Now trim is done, and we can convert the progile to surface. this is just existing the skecth mode

#__________________________________________________


# Solidify Sketch
mode = InteractionMode.Solid
result = ViewHelper.SetViewMode(mode, None)
# EndBlock

#__________________________________________________

# Extude the tooth profile

#__________________________________________________


# Extrude 1 Face
selection = FaceSelection.Create(GetRootPart().Bodies[0].Faces[0])
options = ExtrudeFaceOptions()
options.ExtrudeType = ExtrudeType.Add
result = ExtrudeFaces.Execute(selection, MM(1270.0), options)
# EndBlock

#__________________________________________________

# Mirror the tooth, so we have full tooth

#__________________________________________________


# Mirror
selection = BodySelection.Create(GetRootPart().Bodies[0])
mirrorPlane = FaceSelection.Create(GetRootPart().Bodies[0].Faces[4])
options = MirrorOptions()
result = Mirror.Execute(selection, mirrorPlane, options, None)
# EndBlock


# Delete Objects
selection = Selection.Create(GetRootPart().DatumPlanes[0])
result = Delete.Execute(selection)
# EndBlock

#__________________________________________________

# using patern tool to make the other 11 tooths, selected the center of the base circle and rotated around it to make other tooths. pattern tool, makes copies of the object around a point or in a line, we can define how many copies.

#__________________________________________________


# Create Pattern
selection = BodySelection.Create(GetRootPart().Bodies[0])
data = CircularPatternData()
data.CircularAxis = Selection.Create(GetRootPart().CoordinateSystems[0].Axes[1])
data.RadialDirection = Direction.Create(0, 0, 0)
data.CircularCount = Num_Tooths
data.CircularAngle = DEG(360)
result = Pattern.CreateCircular(selection, data, None)
# EndBlock

#__________________________________________________

# All the tooth will be in diff folders and we want them all in root, so just copying and pasing them all, and then deleteing all orignal folders

#__________________________________________________


# Copy items
result = Copy.Execute(BodySelection.Create([GetRootPart().Components[0].Components[0].Content.Bodies[0], GetRootPart().Components[0].Components[1].Content.Bodies[0], GetRootPart().Components[0].Components[2].Content.Bodies[0], GetRootPart().Components[0].Components[3].Content.Bodies[0], GetRootPart().Components[0].Components[4].Content.Bodies[0], GetRootPart().Components[0].Components[5].Content.Bodies[0], GetRootPart().Components[0].Components[6].Content.Bodies[0], GetRootPart().Components[0].Components[7].Content.Bodies[0], GetRootPart().Components[0].Components[8].Content.Bodies[0], GetRootPart().Components[0].Components[9].Content.Bodies[0], GetRootPart().Components[0].Components[10].Content.Bodies[0], GetRootPart().Components[0].Components[11].Content.Bodies[0], GetRootPart().Components[0].Components[12].Content.Bodies[0], GetRootPart().Components[0].Components[13].Content.Bodies[0], GetRootPart().Components[0].Components[14].Content.Bodies[0], GetRootPart().Components[0].Components[15].Content.Bodies[0], GetRootPart().Components[0].Components[16].Content.Bodies[0], GetRootPart().Components[0].Components[17].Content.Bodies[0]]))
# EndBlock


# Delete Objects
selection = ComponentSelection.Create(GetRootPart().Components[0])
result = Delete.Execute(selection)
# EndBlock


# Delete Objects
selection = Selection.Create(GetRootPart().GetChildren[IDocObject]()[-1])
result = Delete.Execute(selection)
# EndBlock

#__________________________________________________

# Making the rest of the gear, will project the base of the tooth on a plane and then connecting all theprojections so it is a closed circle

#__________________________________________________


# Create Datum Plane
selection = Selection.Create(GetRootPart().CoordinateSystems[0].Axes[1])
result = DatumPlaneCreator.Create(selection, True, None)
# EndBlock


# Translate Along Z Handle
selection = Selection.Create(GetRootPart().DatumPlanes[0])
direction = Move.GetDirection(selection)
options = MoveOptions()
result = Move.Translate(selection, direction, MM(1270.0), options)
# EndBlock


# Set Sketch Plane
selection = Selection.Create(GetRootPart().DatumPlanes[0])
result = ViewHelper.SetSketchPlane(selection, None)
# EndBlock


# Set New Sketch
result = SketchHelper.StartConstraintSketching()
# EndBlock


# Sketch Circle
origin = Point2D.Create(MM(0), MM(0))
result = SketchCircle.Create(origin, MM(2031.9999999999995))
# EndBlock


# Solidify Sketch
mode = InteractionMode.Solid
result = ViewHelper.SetViewMode(mode, None)
# EndBlock


# Extrude Up To Body
selection = FaceSelection.Create(GetRootPart().Bodies[18].Faces[0])
upToSelection = FaceSelection.Create(GetRootPart().Bodies[2].Faces[7])
options = ExtrudeFaceOptions()
result = ExtrudeFaces.UpTo(selection, Direction.DirY, upToSelection, Point.Create(MM(-52.270472154669), MM(0), MM(-65.7622071785207)), options)
# EndBlock


# Optimization

#__________________________________________________


# Create 108 Rounds
selection = EdgeSelection.Create([GetRootPart().Bodies[0].Edges[172], GetRootPart().Bodies[0].Edges[175], GetRootPart().Bodies[0].Edges[177], GetRootPart().Bodies[0].Edges[167], GetRootPart().Bodies[0].Edges[164], GetRootPart().Bodies[0].Edges[160], GetRootPart().Bodies[0].Edges[154], GetRootPart().Bodies[0].Edges[157], GetRootPart().Bodies[0].Edges[159], GetRootPart().Bodies[0].Edges[149], GetRootPart().Bodies[0].Edges[146], GetRootPart().Bodies[0].Edges[142], GetRootPart().Bodies[0].Edges[136], GetRootPart().Bodies[0].Edges[139], GetRootPart().Bodies[0].Edges[141], GetRootPart().Bodies[0].Edges[131], GetRootPart().Bodies[0].Edges[128], GetRootPart().Bodies[0].Edges[124], GetRootPart().Bodies[0].Edges[118], GetRootPart().Bodies[0].Edges[121], GetRootPart().Bodies[0].Edges[123], GetRootPart().Bodies[0].Edges[113], GetRootPart().Bodies[0].Edges[110], GetRootPart().Bodies[0].Edges[106], GetRootPart().Bodies[0].Edges[100], GetRootPart().Bodies[0].Edges[103], GetRootPart().Bodies[0].Edges[105], GetRootPart().Bodies[0].Edges[95], GetRootPart().Bodies[0].Edges[92], GetRootPart().Bodies[0].Edges[88], GetRootPart().Bodies[0].Edges[82], GetRootPart().Bodies[0].Edges[85], GetRootPart().Bodies[0].Edges[87], GetRootPart().Bodies[0].Edges[77], GetRootPart().Bodies[0].Edges[74], GetRootPart().Bodies[0].Edges[70], GetRootPart().Bodies[0].Edges[64], GetRootPart().Bodies[0].Edges[67], GetRootPart().Bodies[0].Edges[69], GetRootPart().Bodies[0].Edges[59], GetRootPart().Bodies[0].Edges[56], GetRootPart().Bodies[0].Edges[52], GetRootPart().Bodies[0].Edges[46], GetRootPart().Bodies[0].Edges[49], GetRootPart().Bodies[0].Edges[51], GetRootPart().Bodies[0].Edges[41], GetRootPart().Bodies[0].Edges[38], GetRootPart().Bodies[0].Edges[34], GetRootPart().Bodies[0].Edges[28], GetRootPart().Bodies[0].Edges[31], GetRootPart().Bodies[0].Edges[33], GetRootPart().Bodies[0].Edges[23], GetRootPart().Bodies[0].Edges[20], GetRootPart().Bodies[0].Edges[268], GetRootPart().Bodies[0].Edges[262], GetRootPart().Bodies[0].Edges[265], GetRootPart().Bodies[0].Edges[267], GetRootPart().Bodies[0].Edges[257], GetRootPart().Bodies[0].Edges[254], GetRootPart().Bodies[0].Edges[250], GetRootPart().Bodies[0].Edges[244], GetRootPart().Bodies[0].Edges[247], GetRootPart().Bodies[0].Edges[249], GetRootPart().Bodies[0].Edges[239], GetRootPart().Bodies[0].Edges[236], GetRootPart().Bodies[0].Edges[232], GetRootPart().Bodies[0].Edges[226], GetRootPart().Bodies[0].Edges[229], GetRootPart().Bodies[0].Edges[231], GetRootPart().Bodies[0].Edges[221], GetRootPart().Bodies[0].Edges[218], GetRootPart().Bodies[0].Edges[214], GetRootPart().Bodies[0].Edges[208], GetRootPart().Bodies[0].Edges[211], GetRootPart().Bodies[0].Edges[213], GetRootPart().Bodies[0].Edges[203], GetRootPart().Bodies[0].Edges[200], GetRootPart().Bodies[0].Edges[196], GetRootPart().Bodies[0].Edges[190], GetRootPart().Bodies[0].Edges[193], GetRootPart().Bodies[0].Edges[195], GetRootPart().Bodies[0].Edges[185], GetRootPart().Bodies[0].Edges[182], GetRootPart().Bodies[0].Edges[178], GetRootPart().Bodies[0].Edges[272], GetRootPart().Bodies[0].Edges[304], GetRootPart().Bodies[0].Edges[298], GetRootPart().Bodies[0].Edges[301], GetRootPart().Bodies[0].Edges[303], GetRootPart().Bodies[0].Edges[293], GetRootPart().Bodies[0].Edges[290], GetRootPart().Bodies[0].Edges[286], GetRootPart().Bodies[0].Edges[280], GetRootPart().Bodies[0].Edges[283], GetRootPart().Bodies[0].Edges[285], GetRootPart().Bodies[0].Edges[275], GetRootPart().Bodies[0].Edges[310], GetRootPart().Bodies[0].Edges[305], GetRootPart().Bodies[0].Edges[318], GetRootPart().Bodies[0].Edges[321], GetRootPart().Bodies[0].Edges[323], GetRootPart().Bodies[0].Edges[313], GetRootPart().Bodies[0].Edges[2], GetRootPart().Bodies[0].Edges[16], GetRootPart().Bodies[0].Edges[5], GetRootPart().Bodies[0].Edges[15], GetRootPart().Bodies[0].Edges[10], GetRootPart().Bodies[0].Edges[13], ])
options = ConstantRoundOptions()
result = ConstantRound.Execute(selection, MM(38.099999999999994), options, None)
# EndBlock


# Create 108 Rounds
selection = EdgeSelection.Create([GetRootPart().Bodies[0].Edges[132], GetRootPart().Bodies[0].Edges[135], GetRootPart().Bodies[0].Edges[142], GetRootPart().Bodies[0].Edges[140], GetRootPart().Bodies[0].Edges[138], GetRootPart().Bodies[0].Edges[143], GetRootPart().Bodies[0].Edges[144], GetRootPart().Bodies[0].Edges[147], GetRootPart().Bodies[0].Edges[154], GetRootPart().Bodies[0].Edges[152], GetRootPart().Bodies[0].Edges[150], GetRootPart().Bodies[0].Edges[155], GetRootPart().Bodies[0].Edges[156], GetRootPart().Bodies[0].Edges[159], GetRootPart().Bodies[0].Edges[166], GetRootPart().Bodies[0].Edges[164], GetRootPart().Bodies[0].Edges[162], GetRootPart().Bodies[0].Edges[167], GetRootPart().Bodies[0].Edges[168], GetRootPart().Bodies[0].Edges[171], GetRootPart().Bodies[0].Edges[178], GetRootPart().Bodies[0].Edges[176], GetRootPart().Bodies[0].Edges[174], GetRootPart().Bodies[0].Edges[179], GetRootPart().Bodies[0].Edges[180], GetRootPart().Bodies[0].Edges[183], GetRootPart().Bodies[0].Edges[190], GetRootPart().Bodies[0].Edges[188], GetRootPart().Bodies[0].Edges[186], GetRootPart().Bodies[0].Edges[191], GetRootPart().Bodies[0].Edges[192], GetRootPart().Bodies[0].Edges[195], GetRootPart().Bodies[0].Edges[202], GetRootPart().Bodies[0].Edges[200], GetRootPart().Bodies[0].Edges[198], GetRootPart().Bodies[0].Edges[203], GetRootPart().Bodies[0].Edges[205], GetRootPart().Bodies[0].Edges[208], GetRootPart().Bodies[0].Edges[215], GetRootPart().Bodies[0].Edges[213], GetRootPart().Bodies[0].Edges[211], GetRootPart().Bodies[0].Edges[204], GetRootPart().Bodies[0].Edges[0], GetRootPart().Bodies[0].Edges[3], GetRootPart().Bodies[0].Edges[10], GetRootPart().Bodies[0].Edges[8], GetRootPart().Bodies[0].Edges[6], GetRootPart().Bodies[0].Edges[11], GetRootPart().Bodies[0].Edges[131], GetRootPart().Bodies[0].Edges[12], GetRootPart().Bodies[0].Edges[60], GetRootPart().Bodies[0].Edges[63], GetRootPart().Bodies[0].Edges[70], GetRootPart().Bodies[0].Edges[68], GetRootPart().Bodies[0].Edges[66], GetRootPart().Bodies[0].Edges[71], GetRootPart().Bodies[0].Edges[72], GetRootPart().Bodies[0].Edges[75], GetRootPart().Bodies[0].Edges[82], GetRootPart().Bodies[0].Edges[80], GetRootPart().Bodies[0].Edges[78], GetRootPart().Bodies[0].Edges[83], GetRootPart().Bodies[0].Edges[84], GetRootPart().Bodies[0].Edges[87], GetRootPart().Bodies[0].Edges[94], GetRootPart().Bodies[0].Edges[92], GetRootPart().Bodies[0].Edges[90], GetRootPart().Bodies[0].Edges[95], GetRootPart().Bodies[0].Edges[96], GetRootPart().Bodies[0].Edges[99], GetRootPart().Bodies[0].Edges[106], GetRootPart().Bodies[0].Edges[104], GetRootPart().Bodies[0].Edges[102], GetRootPart().Bodies[0].Edges[107], GetRootPart().Bodies[0].Edges[108], GetRootPart().Bodies[0].Edges[111], GetRootPart().Bodies[0].Edges[118], GetRootPart().Bodies[0].Edges[116], GetRootPart().Bodies[0].Edges[114], GetRootPart().Bodies[0].Edges[119], GetRootPart().Bodies[0].Edges[120], GetRootPart().Bodies[0].Edges[123], GetRootPart().Bodies[0].Edges[130], GetRootPart().Bodies[0].Edges[128], GetRootPart().Bodies[0].Edges[126], GetRootPart().Bodies[0].Edges[59], GetRootPart().Bodies[0].Edges[48], GetRootPart().Bodies[0].Edges[51], GetRootPart().Bodies[0].Edges[58], GetRootPart().Bodies[0].Edges[56], GetRootPart().Bodies[0].Edges[54], GetRootPart().Bodies[0].Edges[47], GetRootPart().Bodies[0].Edges[36], GetRootPart().Bodies[0].Edges[39], GetRootPart().Bodies[0].Edges[46], GetRootPart().Bodies[0].Edges[44], GetRootPart().Bodies[0].Edges[42], GetRootPart().Bodies[0].Edges[35], GetRootPart().Bodies[0].Edges[32], GetRootPart().Bodies[0].Edges[30], GetRootPart().Bodies[0].Edges[15], GetRootPart().Bodies[0].Edges[34], GetRootPart().Bodies[0].Edges[20], GetRootPart().Bodies[0].Edges[18], GetRootPart().Bodies[0].Edges[22], GetRootPart().Bodies[0].Edges[23], GetRootPart().Bodies[0].Edges[24], GetRootPart().Bodies[0].Edges[27], ])
options = ConstantRoundOptions()
result = ConstantRound.Execute(selection, MM(38.099999999999994), options, None)
# EndBlock


# Delete Objects
selection = Selection.Create(GetRootPart().DatumPlanes[0])
result = Delete.Execute(selection)
# EndBlock


# Delete Objects
selection = Selection.Create(GetRootPart().GetChildren[IDocObject]()[-1])
result = Delete.Execute(selection)
# EndBlock


# Create Datum Plane
selection = FaceSelection.Create(GetRootPart().Bodies[0].Faces[6])
result = DatumPlaneCreator.Create(selection, True, None)
# EndBlock


# Move Upto Selected Object
selection = Selection.Create(GetRootPart().DatumPlanes[0])
upToSelection = FaceSelection.Create(GetRootPart().Bodies[0].Faces[5])
anchorPoint = Move.GetAnchorPoint(selection)
options = MoveOptions()
result = Move.UpTo(selection, upToSelection, anchorPoint, options)
# EndBlock


# Set Sketch Plane
selection = Selection.Create(GetRootPart().DatumPlanes[0])
result = ViewHelper.SetSketchPlane(selection, None)
# EndBlock


# Set New Sketch
result = SketchHelper.StartConstraintSketching()
# EndBlock


# Sketch Circle
origin = Point2D.Create(MM(4.16333634234434e-14), MM(-2.77555756156289e-14))
result = SketchCircle.Create(origin, MM(685.7999999999998))
# EndBlock


# Solidify Sketch
mode = InteractionMode.Solid
result = ViewHelper.SetViewMode(mode, None)
# EndBlock


# Extrude Up To Body
selection = FaceSelection.Create(GetRootPart().Bodies[0].Faces[325])
upToSelection = FaceSelection.Create(GetRootPart().Bodies[0].Faces[5])
options = ExtrudeFaceOptions()
result = ExtrudeFaces.UpTo(selection, Direction.DirY, upToSelection, Point.Create(MM(-32.0087906931224), MM(0), MM(-44.8579705961346)), options)
# EndBlock


# Create 2 Rounds
selection = EdgeSelection.Create([GetRootPart().Bodies[0].Edges[757], GetRootPart().Bodies[0].Edges[756], ])
options = ConstantRoundOptions()
result = ConstantRound.Execute(selection, MM(38.099999999999994), options, None)
# EndBlock


# Delete Objects
selection = Selection.Create(GetRootPart().DatumPlanes[0])
result = Delete.Execute(selection)
# EndBlock

#__________________________________________________
