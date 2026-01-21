// Isolated component for react-peeps to enable code-splitting
// This allows the heavy react-peeps library (~2MB) to be lazy-loaded
import Peep from 'react-peeps';
import { ComponentProps } from 'react';

type PeepCharacterProps = ComponentProps<typeof Peep>;

export function PeepCharacter(props: PeepCharacterProps) {
    return <Peep {...props} />;
}
