#!bash
NAME=$1
DFT='funcionarios'
ORIGIN="$(pwd)/.generate/${DFT}"
DIST="$(pwd)/src/app/modules/${NAME}"
if [ $NAME ]; then
    if [ ! -d "$DIST" ]; then
        cp -r ${ORIGIN} ${DIST}
        mv "${DIST}/${DFT}-form" "${DIST}/${NAME}-form"
        mv "${DIST}/${DFT}-list" "${DIST}/${NAME}-list"
        for i in $(find ${DIST} -type f); do
            # Replace names in file
            ucFirstOrigin=$( echo "$DFT" | sed 's/.*/\u&/')
            ucFirstDist=$( echo "$NAME" | sed 's/.*/\u&/')
            sed -i -e "s/${DFT}/${NAME}/g" ${i}
            sed -i -e "s/${ucFirstOrigin}/${ucFirstDist}/g" ${i}
            # replace file names
            NEW_FILE=$( echo $i | sed -e "s/${DFT}/${NAME}/g" )
            mv $i $NEW_FILE
            echo $i;
        done;
        echo "Package created!";

    fi
    if [ ! -d "$DIST" ]; then
        echo "Fail";
    fi
fi
