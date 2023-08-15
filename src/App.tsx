import { Canvas, useFrame } from "@react-three/fiber";
import { Gltf, ScrollControls, useScroll } from "@react-three/drei";
import flyThroughState from "./state.json";
import { getProject, val } from "@theatre/core";

import {
    editable as e,
    SheetProvider,
    PerspectiveCamera,
    useCurrentSheet,
} from "@theatre/r3f";

function Scene() {
    const sheet = useCurrentSheet();
    const scroll = useScroll();
    const bgColor = "#84a4f4";

    // our callback will run on every animation frame
    useFrame(() => {
        if (sheet?.sequence) {
            // the length of our sequence
            const sequenceLength = val(sheet.sequence.pointer.length);

            // update the "position" of the playhead in the sequence, as a fraction of its whole length
            sheet.sequence.position = scroll.offset * sequenceLength;
        }
    });

    return (
        <>
            <color attach="background" args={[bgColor]} />
            <fog attach="fog" color={bgColor} near={-4} far={10} />
            <ambientLight intensity={0.5} />
            <e.directionalLight position={[-5, 5, -5]} intensity={1.5} theatreKey="Directional Light"/>
            <Gltf src="/environment.glb" castShadow receiveShadow/>
            <PerspectiveCamera
                theatreKey="Camera"
                makeDefault
                position={[0, 0, 0]}
                fov={90}
                near={0.1}
                far={70}
            />
        </>
    )
}

export default function App() {
    // const sheet = getProject("Fly Through").sheet("Scene");
    const sheet = getProject("Fly Through", {state: flyThroughState}).sheet("Scene");

    return (
        <Canvas gl={{ preserveDrawingBuffer: true }}>
            <ScrollControls pages={5}>
                <SheetProvider sheet={sheet}>
                    <Scene />
                </SheetProvider>
            </ScrollControls>
        </Canvas>
    )
}