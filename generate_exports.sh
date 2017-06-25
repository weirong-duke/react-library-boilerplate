#We are going to loop through all the folders under /src/react/components/exports (these are the components we want to export)
#Then, we will generate one import and export line per component
#This is what shows up in the /lib/ folder

#For example:
#wchen-disney-postit/src/components/PostItNote
#Generates ./lib/PostItNote
#

#import _PostItNote from './PostItNote';
#export { _PostItNote as PostItNote };
#
#Projects using wchen-disney-postit as a dependency can just reference the container required
#import { PostItNote } from 'wchen-disney-sticky';


#This gets compiled by babel into ES5 in the /lib/ folder

EXPORT_FILE='wchen-disney-postit.js'
EXPORT_DIRECTORY="./src/components/*/"

> $EXPORT_FILE

for dir in $EXPORT_DIRECTORY
do
    dir=${dir%*/}
    echo import _${dir##*/} from \'./${dir##*/}\'\; >> $EXPORT_FILE
    echo export \{ _${dir##*/}\ as ${dir##*/} \}\; >> $EXPORT_FILE
done
