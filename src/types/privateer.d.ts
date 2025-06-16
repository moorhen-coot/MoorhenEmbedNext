import { emscriptem } from "./emscriptem";

export namespace privateer {
    type TorsionEntry = {
        sugar_1: string;
        sugar_2: string;
        atom_number_1: string;
        atom_number_2: string;
        phi: number;
        psi: number;
    }

    type ResultsEntry = {
        svg: string;
        wurcs: string;
        chain: string;
        glyconnect_id: string;
        glytoucan_id: string;
        id: string;
        torsion_err: number;
        conformation_err: number;
        anomer_err: number;
        puckering_err: number;
        chirality_err: number;
        torsions: emscripten.vector<TorsionEntry> ;
    }
}
