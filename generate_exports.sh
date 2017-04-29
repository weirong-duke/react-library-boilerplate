#We are going to loop through all the folders under /src/react/components/exports (these are the components we want to export)
#Then, we will generate one import and export line per component
#This is what shows up in the /lib/ folder

#For example:
#mf-react-standards/src/js/components/exports/MfContainer
#Generates ./lib/exports/MfContainer
#

#import _MfContainer from './MfContainer';
#export { _MfContainer as MfContainer };
#
#Projects using mf-react-standards as a dependency can just reference the container required
#import { MfContainer } from 'mf-react-standards';


#This gets compiled by babel into ES5 in the /lib/ folder

EXPORT_FILE='mf-react-standards.js'

> $EXPORT_FILE

for dir in ./src/js/components/exports/*/
do
    dir=${dir%*/}
    echo import _${dir##*/} from \'./exports/${dir##*/}\'\; >> $EXPORT_FILE
    echo export \{ _${dir##*/}\ as ${dir##*/} \}\; >> $EXPORT_FILE
done

