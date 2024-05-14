import Quill from 'quill';
import React, { useEffect, useRef } from 'react';
import * as htmlDocx from 'html-docx-js';

var doo = true;
const DocEditorcomponent = () => {
    
    const editorRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        if(doo){
            const quill = new Quill('#editor', {
              theme: 'snow'
            });
            doo=false;
        }
    }, []);
  
  return (
    <div>

      {/* <!-- Include stylesheet --> */}
      <link href="https://cdn.jsdelivr.net/npm/quill@2.0.0-rc.5/dist/quill.snow.css" rel="stylesheet" /> 

      <div id="editor" className="ql-editor text-black" data-gramm="false" contentEditable={true}>
        <p><br /></p>
        <h1>Spur Gear - Design Documentation</h1>
        <h2><br /></h2>
        <h2><strong style={{ color: 'var(--tw-prose-bold)' }}>Design Specifications:</strong></h2>
        <ul>
          <li><span style={{ color: 'var(--tw-prose-bold)' }}>Force to Transmit:</span> 400N</li>
          <li><span style={{ color: 'var(--tw-prose-bold)' }}>Stress Resistance:</span> 20N</li>
          <li><span style={{ color: 'var(--tw-prose-bold)' }}>Thickness:</span> 2mm</li>
          <li><span style={{ color: 'var(--tw-prose-bold)' }}>Keywords:</span> Module, Budget, Pitch, Torque</li>
          <li><br /></li>
        </ul>
        <h2><strong style={{ color: 'var(--tw-prose-bold)' }}>Gear Design Overview:</strong></h2>
        <p><strong style={{ color: 'var(--tw-prose-bold)' }}>The gear designed based on the provided specifications is intended to efficiently transmit a force of 400N while withstanding a stress of 20N. The gear is engineered with a thickness of 2mm to meet the requirements. The design process considered module, budget constraints, pitch, and torque requirements to ensure optimal performance and cost-effectiveness.</strong></p>
        <p><br /></p>
        <h2><strong style={{ color: 'var(--tw-prose-bold)' }}>Technical Details:</strong></h2>
        <ul>
          <li><span style={{ color: 'var(--tw-prose-bold)' }}>Gear Type:</span> Spur Gear</li>
          <li><span style={{ color: 'var(--tw-prose-bold)' }}>Material:</span> [Specify material]</li>
          <li><span style={{ color: 'var(--tw-prose-bold)' }}>Module:</span> [Insert module size]</li>
          <li><br /></li>
        </ul>
        <p><strong style={{ color: 'var(--tw-prose-bold)' }}>Observation:</strong> The module size of the gear is a crucial parameter affecting the gear's size, strength, and cost. The module size can be determined using the following equation:</p>
        <p>m=F/(<em>τb</em>.d)</p>
        <p><strong style={{ color: 'var(--tw-prose-bold)' }}>​</strong></p>
        <ul>
          <li><strong style={{ color: 'var(--tw-prose-bold)' }}>Where:</strong></li>
          <li><em>m</em> = Module size</li>
          <li><em>F</em> = Force to transmit (400N)</li>
          <li><em>τb</em><strong style={{ color: 'var(--tw-prose-bold)' }}>= Allowable stress (20N)</strong></li>
          <li><em>d</em> = Pitch diameter of the gear</li>
        </ul>
        <p><br /></p>
        <p><br /></p>
        <p><strong style={{ color: 'var(--tw-prose-bold)' }}>Number of Teeth</strong><span style={{ color: 'var(--tw-prose-bold)' }}>:</span> [Determined based on module and torque requirements]</p>
        <p><span style={{ color: 'var(--tw-prose-bold)' }}>Observation:</span> The number of teeth on the gear is directly related to the module size and torque requirements. The number of teeth can be calculated using the following equation:</p>
        <p><br /></p>
        <p><span style={{ color: 'var(--tw-prose-bold)' }}>N=(2⋅</span><em>F</em>⋅<em>K)/(PI . τb . m . Y)</em></p>
        <p><strong style={{ color: 'var(--tw-prose-bold)' }}>​</strong></p>
        <ul>
          <li><strong style={{ color: 'var(--tw-prose-bold)' }}>Where:</strong></li>
          <li><br /></li>
          <li><em>N</em> = Number of teeth</li>
          <li><em>F</em> = Force to transmit (400N)</li>
          <li><em>K</em> = Load distribution factor (depends on gear type and application)</li>
          <li><em>τb </em><strong style={{ color: 'var(--tw-prose-bold)' }}>= Allowable stress (20N)</strong></li>
          <li><em>m</em> = Module size</li>
          <li><em>Y</em> = Lewis form factor (depends on tooth profile)</li>
          <li><br /></li>
        </ul>
        <p><br /></p>
        <p><strong style={{ color: 'var(--tw-prose-bold)' }}>Pitch Diameter:</strong> [Calculated value based on module and number of teeth]</p>
        <p><span style={{ color: 'var(--tw-prose-bold)' }}>Observation:</span> The pitch diameter of the gear is essential for determining its size and engagement with other gears in the system. The pitch diameter can be calculated using the following equation:</p>
        <p><br /></p>
        <p><em>d</em>=<em>m</em>⋅<em>N</em></p>
        <ul>
          <li><strong style={{ color: 'var(--tw-prose-bold)' }}>Where:</strong></li>
          <li><em>d</em> = Pitch diameter</li>
          <li><em>m</em> = Module size</li>
          <li><em>N</em> = Number of teeth</li>
          <li><br /></li>
        </ul>
        <p><br /></p>
        <p><strong style={{ color: 'var(--tw-prose-bold)' }}>Pressure Angle:</strong><strong> </strong>[Typically 20 degrees for standard gears]</p>
        <p><span style={{ color: 'var(--tw-prose-bold)' }}>Observation:</span> The pressure angle determines the profile of the gear teeth and affects the smoothness of gear operation. A standard value of 20 degrees is commonly used for spur gears.</p>
        <ul>
          <li><span style={{ color: 'var(--tw-prose-bold)' }}>Tooth Profile:</span> [Describe tooth profile, e.g., involute]</li>
          <li><span style={{ color: 'var(--tw-prose-bold)' }}>Pitch:</span> [Specify pitch value]</li>
          <li><span style={{ color: 'var(--tw-prose-bold)' }}>Backlash:</span> [Specify backlash value]</li>
          <li><span style={{ color: 'var(--tw-prose-bold)' }}>Helix Angle:</span> [If applicable, specify helix angle]</li>
          <li><span style={{ color: 'var(--tw-prose-bold)' }}>Torque Capacity:</span> [Calculated based on material properties and gear dimensions]</li>
        </ul>
        <p><span style={{ color: 'var(--tw-prose-bold)' }}>Observation:</span> The torque capacity of the gear is crucial for ensuring it can withstand the transmitted torque without failure. The torque capacity can be calculated using the following equation:</p>
        <p><br /></p>
        <p><em>T</em>=(<em>τb</em><strong style={{ color: 'var(--tw-prose-bold)' }}>⋅</strong><em>Z</em>⋅<em>m)/2</em></p>
        <p><strong style={{ color: 'var(--tw-prose-bold)' }}>​</strong></p>
        <ul>
          <li><strong style={{ color: 'var(--tw-prose-bold)' }}>Where:</strong></li>
          <li><br /></li>
          <li><em>T</em> = Torque capacity</li>
          <li><em>τb </em><strong style={{ color: 'var(--tw-prose-bold)' }}>= Allowable stress (20N)</strong></li>
          <li><em>Z</em> = Number of teeth</li>
          <li><em>m</em> = Module size</li>
        </ul>
        <p><br /></p>
        <p><br /></p>
        <p><strong style={{ color: 'var(--tw-prose-bold)' }}>Efficiency</strong><span style={{ color: 'var(--tw-prose-bold)' }}>:</span> [Estimated efficiency of the gear transmission system]</p>
        <p><span style={{ color: 'var(--tw-prose-bold)' }}>Observation:</span> The efficiency of the gear transmission system is essential for assessing power losses and overall performance. It can be estimated based on factors such as tooth profile, lubrication, and alignment.</p>
        <p><br /></p>
        <p><br /></p>
        <h2><strong style={{ color: 'var(--tw-prose-bold)' }}>Manufacturing Considerations:</strong></h2>
        <ul>
          <li><span style={{ color: 'var(--tw-prose-bold)' }}>Manufacturing Method:</span> [Specify manufacturing method, e.g., machining, injection molding]</li>
          <li><span style={{ color: 'var(--tw-prose-bold)' }}>Tolerances:</span> [Specify tolerances for dimensional accuracy]</li>
          <li><span style={{ color: 'var(--tw-prose-bold)' }}>Surface Finish:</span> [Specify required surface finish for optimal performance]</li>
          <li><span style={{ color: 'var(--tw-prose-bold)' }}>Heat Treatment:</span> [Specify if heat treatment is necessary for material properties]</li>
        </ul>
        <p><span style={{ color: 'var(--tw-prose-bold)' }}>Observation:</span> Proper manufacturing considerations are crucial for ensuring the gear meets dimensional and performance requirements. Machining processes may require specific tooling and setups to achieve desired tolerances and surface finishes.</p>
        <p><br /></p>
        <h2><strong style={{ color: 'var(--tw-prose-bold)' }}>Performance Analysis:</strong></h2>
        <ul>
          <li><span style={{ color: 'var(--tw-prose-bold)' }}>Stress Analysis:</span> [Provide stress analysis results to ensure gear meets stress resistance requirement]</li>
          <li><span style={{ color: 'var(--tw-prose-bold)' }}>Finite Element Analysis (FEA):</span> [If conducted, provide FEA results for further validation]</li>
          <li><span style={{ color: 'var(--tw-prose-bold)' }}>Torque Transmission Analysis:</span> [Provide torque transmission analysis results to ensure gear can transmit required torque]</li>
          <li><span style={{ color: 'var(--tw-prose-bold)' }}>Wear Analysis:</span> [If applicable, provide wear analysis results to assess gear longevity]</li>
        </ul>
        <p><span style={{ color: 'var(--tw-prose-bold)' }}>Observation:</span> Performance analysis is essential for validating the design and ensuring the gear meets functional requirements under operating conditions. Stress analysis and FEA help identify potential failure points, while torque transmission analysis assesses the gear's ability to handle the transmitted torque without failure.</p>
        <p><span style={{ color: 'var(--tw-prose-bold)' }}>Conclusion:</span></p>
        <p><br /></p>
        <p><strong style={{ color: 'var(--tw-prose-bold)' }}>The gear design presented in this documentation meets the specified requirements for force transmission, stress resistance, and thickness. The design process considered module, budget, pitch, and torque constraints to ensure optimal performance and cost-effectiveness. Further analysis and manufacturing considerations have been provided to ensure the reliability and durability of the gear in practical applications.</strong></p>
        <p><br /></p>
      </div>

      {/* <!-- Include the Quill library --> */}
      <script src="https://cdn.jsdelivr.net/npm/quill@2.0.0-rc.5/dist/quill.js"></script>

    </div>
  );
}

export default DocEditorcomponent;








