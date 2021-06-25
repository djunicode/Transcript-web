import json
import tabula


def getresult(data, marksheet):
    file = data["file"]
    sem = data["sem"]
    json_file = "Images/marks/" + str(file) + ".json"

    new = tabula.io.convert_into(file, json_file, output_format="json")
    f = open(json_file)
    a = json.load(f)
    try:
        a = a[0]["data"][2:]
        a = a[:-3]
        print(type(a))

        final_cgpa = a[0][-1]["text"]
        obj = {}
        lis = []
        obj["cgpa"] = final_cgpa
        obj["subject"] = lis
        # p = a.size()
        # marksheet["sem"] = sem
        for i in a:
            dic = {}
            dic["course_code"] = i[0]["text"]
            dic["course_name"] = i[1]["text"].replace("\r", " ")
            dic["credits_earned"] = i[3]["text"]
            dic["grade"] = i[10]["text"]
            dic["pointer"] = i[12]["text"]
            dic["cg"] = i[13]["text"]
            lis.append(dic)
        # print(obj)
        marksheet[sem] = obj
        print(marksheet)
        return marksheet, json_file
    except Exception:
        return "wrong file", json_file