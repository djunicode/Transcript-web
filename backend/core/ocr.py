import json
import tabula


def getresult(data):
    file = data["file"]
    sem = data["sem"]
    json_file = "Images/marks/" + str(file) + ".json"
    new = tabula.io.convert_into(file, json_file, output_format="json")
    f = open(json_file)
    a = json.load(f)
    a = a[0]["data"][2:]
    a = a[:-3]
    print(type(a))
    marksheet = {}
    sem = 3

    final_cgpa = a[0][-1]["text"]
    obj = {}
    lis = []
    obj[final_cgpa] = lis
    # p = a.size()
    # marksheet["sem"] = sem
    for i in a:
        dic = {}
        dic["cc"] = i[0]["text"]
        dic["subj"] = i[1]["text"].replace("\r", " ")
        dic["cr"] = i[3]["text"]
        dic["grade"] = i[10]["text"]
        dic["gpa"] = i[12]["text"]
        dic["cg"] = i[13]["text"]
        lis.append(dic)
    # print(obj)
    marksheet[sem] = obj
    print(marksheet)
    return marksheet, json_file
