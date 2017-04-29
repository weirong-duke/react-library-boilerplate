#We are going to loop through all the folders under /src/react/components/exports (these are the components we want to export)
#Then, we will generate one import and export line per component
#This is what shows up in the /lib/ folder

#For example:
#react-library-boilerplate/src/js/components/exports/Container
#Generates ./lib/exports/Container
#

#import _Container from './Container';
#export { _Container as Container };
#
#Projects using react-library-boilerplate as a dependency can just reference the container required
#import { Container } from 'react-library-boilerplate';


#This gets compiled by babel into ES5 in the /lib/ folder

EXPORT_FILE='react-library-boilerplate.js'
EXPORT_DIRECTORY="./src/js/components/exports/*/"

> $EXPORT_FILE

for dir in $EXPORT_DIRECTORY
do
    dir=${dir%*/}
    echo import _${dir##*/} from \'./exports/${dir##*/}\'\; >> $EXPORT_FILE
    echo export \{ _${dir##*/}\ as ${dir##*/} \}\; >> $EXPORT_FILE
done
