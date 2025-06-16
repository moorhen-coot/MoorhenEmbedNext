import { addMolecule, addMap, setActiveMap } from 'moorhen'
import { MoorhenContainer, MoorhenMolecule, MoorhenMap, MoorhenReduxStore } from 'moorhen'
import { useRef } from 'react';
import { moorhen } from 'moorhen/types/moorhen';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

export const WrappedMoorhen = () =>  {

    const dispatch = useDispatch()

    const glRef = useRef(null)
    const timeCapsuleRef = useRef(null)
    const commandCentre = useRef(null)
    const moleculesRef = useRef(null)
    const mapsRef = useRef(null)
    const activeMapRef = useRef(null)
    const lastHoveredAtom = useRef(null)
    const prevActiveMoleculeRef = useRef(null)
    
    const monomerLibraryPath = "https://raw.githubusercontent.com/MRC-LMB-ComputationalStructuralBiology/monomers/master/"
    const baseUrl = 'https://www.ebi.ac.uk/pdbe/entry-files'

    const backgroundColor = useSelector((state: moorhen.State) => state.sceneSettings.backgroundColor)
    const defaultBondSmoothness = useSelector((state: moorhen.State) => state.sceneSettings.defaultBondSmoothness)
    
    const collectedProps = {
        glRef, timeCapsuleRef, commandCentre, moleculesRef, mapsRef, activeMapRef,
        lastHoveredAtom, prevActiveMoleculeRef
    }

    const setDimensions = () => {
        return [600,600]
    }

    const onClick = (pdbCode: string) => {
        loadData(pdbCode)
    }

    const fetchMolecule = async (url: string, molName: string) => {
        const newMolecule = new MoorhenMolecule(commandCentre, glRef, MoorhenReduxStore, monomerLibraryPath)
        newMolecule.setBackgroundColour(backgroundColor)
        newMolecule.defaultBondOptions.smoothness = defaultBondSmoothness
        try {
            await newMolecule.loadToCootFromURL(url, molName)
            if (newMolecule.molNo === -1) {
                throw new Error("Cannot read the fetched molecule...")
            } 
            await newMolecule.fetchIfDirtyAndDraw('CBs')
            await newMolecule.addRepresentation('ligands', '/*/*/*/*')
            await newMolecule.centreOn('/*/*/*/*', true, true)
            dispatch(addMolecule(newMolecule))
        } catch (err) {
            console.warn(err)
            console.warn(`Cannot fetch PDB entry from ${url}, doing nothing...`)
        }
    }

    const fetchMap = async (url: string, mapName: string, isDiffMap: boolean = false) => {
        const newMap = new MoorhenMap(commandCentre, glRef, MoorhenReduxStore)
        try {
            await newMap.loadToCootFromMapURL(url, mapName, isDiffMap)
            if (newMap.molNo === -1) throw new Error("Cannot read the fetched map...")
            dispatch(addMap(newMap))
            dispatch(setActiveMap(newMap))
        } catch (err) {
            console.warn(err)
            console.warn(`Cannot fetch map from ${url}`)
        }
        return newMap
    }

    const loadData = async (pdbCode: string) => {
        await fetchMolecule(`${baseUrl}/download/${pdbCode}.cif`, pdbCode)
        await fetchMap(`${baseUrl}/${pdbCode}_diff.ccp4`, `${pdbCode}-FoFc`, true)
        await fetchMap(`${baseUrl}/${pdbCode}.ccp4`, `${pdbCode}-2FoFc`)
    }

    return <>
            <Button onClick={() => onClick("5a3h")}>5a3h</Button>
            <Button onClick={() => onClick("4dfr")}>4dfr</Button>
            <Button onClick={() => onClick("5vof")}>5vof</Button>
               <MoorhenContainer setMoorhenDimensions={setDimensions} {...collectedProps}/>
           </>

}
