ucWordsName="";
export IFS="-"
sentence="one-two-three"
for word in $sentence; do
        ucWordsName=$( echo "$word" | sed 's/.*/\u&/')${ucWordsName};
done
echo ${ucWordsName}