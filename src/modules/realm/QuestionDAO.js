import { getRealm } from "./index";
import { DB } from "../../utils/Constants";

function saveAllQuestions(questions) {
  const realm = getRealm();
  realm.write(() => {
    questions.map(question => {
      realm.create(DB.QUESTION_SCHEME, question, true);
    });
  });
}

function getQuestions() {
  // return Array.from(getRealm().objects(DB.QUESTION_SCHEME));
  return getRealm()
    .objects(DB.QUESTION_SCHEME)
    .sorted("index");
}

function deleteAllQuestions() {
  const realm = getRealm();
  realm.write(() => {
    const allQuestions = realm.objects(DB.QUESTION_SCHEME).sorted("index");
    realm.delete(allQuestions);
  });
}

export { saveAllQuestions, getQuestions, deleteAllQuestions };
