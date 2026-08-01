const STORAGE_KEY = "finance-lab-progress-v2";

const trackSpecs = [
  { id: "bookkeeping3", code: "A / 簿記3級", title: "簿記3級", subtitle: "仕訳から決算書まで", category: "journal", description: "簿記の土台を、仕訳・決算整理・財務諸表まで一気につなぐ。", level: "3級", units: ["簿記の全体像", "仕訳の基本", "現金・預金", "当座預金と小切手", "商品売買", "掛取引", "手形", "有形固定資産", "貸倒れと引当金", "費用・収益の前払未収", "決算整理", "財務諸表の作成"] },
  { id: "bookkeeping2", code: "B / 2級商業", title: "簿記2級・商業簿記", subtitle: "企業会計の論点へ", category: "commercial", description: "株式会社、税効果、有価証券、連結会計など、2級の論点を細かく分解する。", level: "2級", units: ["株式会社会計", "剰余金と配当", "税効果会計", "有価証券", "債権の評価", "固定資産の減損", "リース取引", "研究開発費", "社債", "外貨建取引", "本支店会計", "連結会計の入口", "連結修正仕訳", "企業結合", "商品売買の応用", "収益認識", "退職給付", "デリバティブの基礎"] },
  { id: "industrial2", code: "C / 2級工業", title: "簿記2級・工業簿記", subtitle: "原価の流れと意思決定", category: "industrial", description: "材料・労務・経費から製品原価、差異分析、CVPまでをつなぐ。", level: "2級", units: ["原価の三要素", "製造間接費", "個別原価計算", "総合原価計算", "工程別総合原価", "組別総合原価", "標準原価計算", "原価差異分析", "直接原価計算", "CVP分析", "本社工場会計", "予算差異"] },
  { id: "statements", code: "D / 三表", title: "財務三表", subtitle: "BS・PL・CFを連動させる", category: "statements", description: "BS・PL・CFを別々に暗記せず、1つの会社の物語として読む。", level: "基礎", units: ["BSの構造", "PLの構造", "CFの構造", "三表の連動", "運転資金", "売上と利益", "利益と現金", "投資と減価償却", "借入と財務CF", "配当と純資産"] },
  { id: "reading", code: "E / 読解", title: "財務諸表を読む", subtitle: "実務型の決算データから推測する", category: "reading", description: "演習用の決算データを使い、数字の変化から会社の状態を推測する。", level: "実務", units: ["5年比較", "売上成長の質", "粗利率の変化", "販管費の変化", "売掛金の膨張", "在庫の膨張", "営業CFの弱さ", "投資CFの読み方", "借入依存", "注記・セグメント"] },
  { id: "analysis", code: "F / 分析", title: "財務分析", subtitle: "比率を問いに変える", category: "analysis", description: "収益性・安全性・効率性を計算し、次に調べるべき原因まで考える。", level: "実務", units: ["売上高利益率", "粗利率", "営業利益率", "総資産回転率", "流動比率", "当座比率", "自己資本比率", "ROA", "ROEデュポン", "CCC"] },
  { id: "capital", code: "G / 資本効率", title: "ROI・ROE・ROIC・EBITDA", subtitle: "資本が利益を生む構造", category: "capital", description: "ROI、ROE、ROIC、EBITDA、WACC、EVAを、式だけでなく経営判断で使う。", level: "実務", units: ["ROI", "ROE", "ROIC", "EBITDA（正しい表記）", "EBITとNOPAT", "WACC", "EVA", "投下資本の回収"] },
  { id: "mg", code: "H / MG", title: "管理会計・MG", subtitle: "限界利益から次の一手へ", category: "mg", description: "限界利益・固定費・損益分岐点・商品ミックスで意思決定する。", level: "実務", units: ["限界利益", "変動費・固定費", "損益分岐点", "目標利益", "商品ミックス", "値下げ判断", "特別注文", "予算と実績"] },
  { id: "inference", code: "I / 推測", title: "推測・異常発見", subtitle: "数字の裏側に仮説を置く", category: "inference", description: "一つの数字で断定せず、複数の兆候を組み合わせて仮説を立てる。", level: "実務", units: ["BSからの推測", "PLからの推測", "CFからの推測", "比率の組合せ", "急成長会社の罠", "粉飾兆候の仮説"] },
  { id: "cases", code: "J / 統合", title: "統合ケース", subtitle: "財務諸表から意思決定まで", category: "case", description: "財務諸表・管理会計・資本効率をまとめて使い、経営判断を出す。", level: "実務", units: ["飲食事業ケース", "人材事業ケース", "SaaS事業ケース", "研修事業ケース", "出店判断ケース", "借入判断ケース"] }
];

const learningLevels = [
  { number: 1, title: "仕訳の入口" },
  { number: 2, title: "日常取引" },
  { number: 3, title: "決算の入口" },
  { number: 4, title: "2級商業・基礎" },
  { number: 5, title: "2級商業・応用" },
  { number: 6, title: "工業簿記・原価" },
  { number: 7, title: "財務三表" },
  { number: 8, title: "財務諸表読解" },
  { number: 9, title: "資本効率・管理会計" },
  { number: 10, title: "推測・統合判断" }
];

function learningLevelFor(index) {
  const ends = [4, 8, 12, 21, 30, 42, 52, 72, 88, 100];
  const number = ends.findIndex((end) => index < end) + 1;
  return learningLevels[number - 1];
}

let curriculumOffset = 0;
const tracks = trackSpecs.map((track) => ({
  ...track,
  units: track.units.map((title, index) => {
    const level = learningLevelFor(curriculumOffset);
    curriculumOffset += 1;
    return {
      id: `${track.id}-${String(index + 1).padStart(3, "0")}`,
      trackId: track.id,
      trackTitle: track.title,
      code: `${track.code.split(" / ")[0]}-${String(index + 1).padStart(2, "0")}`,
      title,
      index,
      category: track.category,
      level: track.level,
      learningLevel: level.number,
      learningLevelTitle: level.title,
      summary: `${title}を、定義・計算・読み取り・意思決定の4方向から10問で固める。`
    };
  })
}));

const allUnits = tracks.flatMap((track) => track.units);
const trackById = Object.fromEntries(tracks.map((track) => [track.id, track]));
const unitById = Object.fromEntries(allUnits.map((unit) => [unit.id, unit]));

const statementProfiles = [
  { name: "青葉商事", sales: 1200, gross: 420, op: 96, cash: 110, receivables: 260, inventory: 180, debt: 430, opcf: 82, capex: 65 },
  { name: "東雲フーズ", sales: 980, gross: 392, op: 44, cash: 72, receivables: 190, inventory: 260, debt: 520, opcf: 18, capex: 24 },
  { name: "光野サービス", sales: 1500, gross: 600, op: 210, cash: 380, receivables: 180, inventory: 20, debt: 160, opcf: 224, capex: 90 },
  { name: "南町ロジスティクス", sales: 2200, gross: 440, op: 88, cash: 95, receivables: 420, inventory: 130, debt: 890, opcf: 54, capex: 260 },
  { name: "白金メディア", sales: 760, gross: 570, op: 22, cash: 310, receivables: 120, inventory: 0, debt: 70, opcf: 38, capex: 12 },
  { name: "港町製作所", sales: 1850, gross: 555, op: 74, cash: 86, receivables: 360, inventory: 410, debt: 610, opcf: -12, capex: 180 },
  { name: "野原ヘルスケア", sales: 1320, gross: 528, op: 158, cash: 240, receivables: 220, inventory: 85, debt: 260, opcf: 176, capex: 44 },
  { name: "水城デザイン", sales: 540, gross: 378, op: 18, cash: 60, receivables: 160, inventory: 5, debt: 205, opcf: -8, capex: 18 },
  { name: "山吹テック", sales: 3000, gross: 1200, op: 60, cash: 190, receivables: 760, inventory: 120, debt: 1200, opcf: 14, capex: 460 },
  { name: "朝凪教育", sales: 880, gross: 528, op: 132, cash: 200, receivables: 90, inventory: 0, debt: 90, opcf: 148, capex: 20 }
];

function q(id, unit, type, prompt, options, answer, explanation, extra = {}) {
  return { id: `${unit.id}-q${String(id + 1).padStart(2, "0")}`, unitId: unit.id, trackId: unit.trackId, unitTitle: unit.title, type, prompt, options, answer, explanation, difficulty: extra.difficulty || (id < 3 ? "基礎" : id < 7 ? "標準" : "応用"), tags: extra.tags || [unit.title], tolerance: extra.tolerance || 0, unit: extra.unit || "", sourceNote: extra.sourceNote || "" };
}

function journalQuestions(unit) {
  const n = unit.index + 1;
  return [
    q(0, unit, "single", `単元「${unit.title}」で最初に確認すべき会計の軸はどれ？`, ["資産・負債・純資産の動き", "社員数だけ", "広告の見た目", "決算日の曜日"], 0, "取引を見たら、まずどの資産・負債・純資産・収益・費用が動くかを確認します。", { tags: ["仕訳", "会計等式"] }),
    q(1, unit, "single", "商品を掛けで販売したとき、販売時点の仕訳の組み合わせはどれ？", ["売掛金／売上", "現金／売上", "仕入／買掛金", "売上／売掛金"], 0, "まだ入金されていない販売代金は売掛金です。貸借を合わせると、売掛金が借方、売上が貸方になります。", { tags: ["商品売買", "掛取引"] }),
    q(2, unit, "number", `資産1,${1000 + n * 20}万円、負債${600 + n * 10}万円のとき、純資産はいくら？`, null, 400 + n * 10, "純資産 ＝ 資産 − 負債。会計等式の残りを求めます。", { unit: "万円", tags: ["会計等式"], tolerance: 0.01 }),
    q(3, unit, "multiple", "当期の利益を増減させる取引をすべて選んでください。", ["商品を販売した", "銀行から借り入れた", "給料を支払った", "株主から出資を受けた"], [0, 2], "売上と費用は利益に影響します。借入と出資は資金調達であり、それ自体は通常、利益ではありません。", { tags: ["利益", "取引"] }),
    q(4, unit, "single", "前払費用を決算整理する理由として正しいものはどれ？", ["翌期の費用を当期から外すため", "現金を増やすため", "売上を増やすため", "負債を必ずゼロにするため"], 0, "支払った時点と費用になる期間が違うため、当期に対応する費用だけを残します。", { tags: ["決算整理", "期間対応"] }),
    q(5, unit, "number", `取得価額${500 + n * 20}万円、残存価額0、耐用年数${5 + (n % 3)}年の定額法。年間減価償却費は？`, null, Math.round((500 + n * 20) / (5 + (n % 3))), "定額法では、取得価額から残存価額を引き、耐用年数で割ります。", { unit: "万円", tags: ["固定資産", "減価償却"], tolerance: 1 }),
    q(6, unit, "single", "試算表の借方合計と貸方合計が一致する意味はどれ？", ["記録の貸借が形式上つり合っている", "利益が必ず出ている", "現金が十分にある", "不正が絶対にない"], 0, "貸借一致は重要なチェックですが、利益・資金・不正の有無まで保証するものではありません。", { tags: ["試算表"] }),
    q(7, unit, "multiple", "決算書を読む前に確認したいものをすべて選んでください。", ["対象期間と決算日", "単位（円・千円・百万円）", "会計方針や注記", "担当者の好きな色"], [0, 1, 2], "期間・単位・会計方針を取り違えると、計算が合っていても読み方を誤ります。", { tags: ["財務諸表", "読み方"] }),
    q(8, unit, "number", `期首商品${180 + n * 5}万円、仕入${600 + n * 10}万円、期末商品${220 + n * 5}万円。売上原価は？`, null, 560 + n * 10, "売上原価 ＝ 期首商品 ＋ 仕入 − 期末商品。", { unit: "万円", tags: ["売上原価"], tolerance: 0.01 }),
    q(9, unit, "single", "簿記を財務諸表につなげるときの正しい順序はどれ？", ["取引→仕訳→勘定集計→決算整理→財務諸表", "財務諸表→仕訳→取引", "利益→現金→仕訳", "注記→売上→取引"], 0, "日々の取引を仕訳し、集計・決算整理を経て財務諸表にします。", { tags: ["簿記の流れ"] })
  ];
}

function commercialQuestions(unit) {
  const n = unit.index + 1;
  return [
    q(0, unit, "single", `「${unit.title}」を学ぶとき、財務会計で最初に確認する視点は？`, ["認識・測定・表示の3段階", "売上の大きさだけ", "現金残高だけ", "税率だけ"], 0, "会計処理は、いつ認識するか、いくらで測定するか、どこに表示するかの3段階で考えると整理できます。", { tags: ["2級商業", "会計処理"] }),
    q(1, unit, "multiple", "連結財務諸表で、企業グループ内の取引を消去する理由をすべて選んでください。", ["グループ外との取引だけを表すため", "内部取引を二重計上しないため", "親会社の現金を増やすため", "未実現利益を調整するため"], [0, 1, 3], "連結は企業グループを1つの経済単位として見ます。内部売買や内部利益は外部との取引ではないため調整します。", { tags: ["連結会計"] }),
    q(2, unit, "number", `額面${100 + n * 10}万円の社債を年利2％で1年間保有。税引前の利息は？`, null, (100 + n * 10) * 0.02, "利息 ＝ 額面金額 × 利率。", { unit: "万円", tags: ["社債", "利息"], tolerance: 0.01 }),
    q(3, unit, "single", "税効果会計が必要になる主な理由はどれ？", ["会計上の利益と課税所得の差を期間対応させるため", "現金を増やすため", "すべての税金をなくすため", "売上を二重に計上するため"], 0, "会計と税務で費用・収益の認識時期が異なる場合に、税金費用を会計利益に対応させます。", { tags: ["税効果"] }),
    q(4, unit, "multiple", "有価証券を読むときに確認する観点をすべて選んでください。", ["保有目的", "期末時点の時価", "評価差額の表示場所", "会社のロゴ"], [0, 1, 2], "保有目的によって分類・評価・損益表示が変わります。時価と表示区分をセットで確認します。", { tags: ["有価証券"] }),
    q(5, unit, "single", "減損損失を認識する考え方として正しいものはどれ？", ["回収可能性が低下した資産の帳簿価額を見直す", "現金を必ず同額支払う", "売上を増やす", "負債を出資に変える"], 0, "資産の収益性や処分価値が低下し、帳簿価額の回収が見込めない場合に減損を検討します。", { tags: ["減損"] }),
    q(6, unit, "number", `税引前利益${80 + n * 5}万円、実効税率30％。税金費用はいくら？`, null, (80 + n * 5) * 0.3, "単純化した設問では、税金費用 ＝ 税引前利益 × 実効税率。", { unit: "万円", tags: ["税金費用"], tolerance: 0.01 }),
    q(7, unit, "single", "本支店会計で本店と支店の内部取引を整理する目的は？", ["会社全体の財務諸表で内部取引を二重計上しないため", "支店の売上を必ずゼロにするため", "現金を隠すため", "利益率を自動的に上げるため"], 0, "本支店を合算するときも、内部取引は外部取引ではないため相殺・消去が必要です。", { tags: ["本支店会計"] }),
    q(8, unit, "multiple", "注記を読む価値が高い論点をすべて選んでください。", ["重要な会計方針", "偶発債務", "セグメント情報", "経営者の趣味"], [0, 1, 2], "数字だけでは見えない前提・リスク・事業別の稼ぐ力を注記から確認できます。", { tags: ["注記", "開示"] }),
    q(9, unit, "single", "2級の論点を実務で使うときに最も危険な姿勢は？", ["仕訳だけ合えば、経済実態を見なくてよいと考えること", "取引の背景を確認すること", "注記を読むこと", "表示区分を確認すること"], 0, "会計処理は取引の経済実態を表すものです。仕訳の形だけ暗記すると、実務の判断を誤ります。", { tags: ["実務"] })
  ];
}

function industrialQuestions(unit) {
  const n = unit.index + 1;
  return [
    q(0, unit, "single", "製造原価の基本的な3要素はどれ？", ["材料費・労務費・経費", "売上・利益・現金", "資産・負債・純資産", "売掛金・買掛金・借入金"], 0, "製造原価は材料費、労務費、経費に分けて捉えます。さらに製造直接費と間接費へ分類します。", { tags: ["原価の三要素"] }),
    q(1, unit, "number", `直接材料費${120 + n * 10}万円、直接労務費${80 + n * 5}万円、製造間接費${60 + n * 5}万円。製造原価は？`, null, 260 + n * 20, "製造原価 ＝ 直接材料費 ＋ 直接労務費 ＋ 製造間接費。", { unit: "万円", tags: ["製造原価"], tolerance: 0.01 }),
    q(2, unit, "multiple", "固定費に近い性質を持つものをすべて選んでください。", ["工場家賃", "生産量に比例する材料費", "設備の減価償却費", "工場監督者の固定給"], [0, 2, 3], "短期的に生産量が変わっても大きく変わらない費用が固定費です。材料費は通常、変動費に近いです。", { tags: ["固定費", "変動費"] }),
    q(3, unit, "single", "製造間接費を配賦する理由はどれ？", ["製品ごとに直接追跡しにくい製造費を合理的に負担させるため", "現金を増やすため", "売上を二重計上するため", "在庫を必ずゼロにするため"], 0, "工場全体の間接費を、作業時間や機械時間などの基準で製品へ配賦します。", { tags: ["配賦"] }),
    q(4, unit, "number", `固定費${300 + n * 20}万円、限界利益率50％。損益分岐点売上高は？`, null, (300 + n * 20) * 2, "損益分岐点売上高 ＝ 固定費 ÷ 限界利益率。", { unit: "万円", tags: ["CVP", "損益分岐点"], tolerance: 0.01 }),
    q(5, unit, "single", "標準原価計算で実際原価との差異を分析する目的は？", ["差異の原因を見つけ、改善行動につなげるため", "差異を必ず利益にするため", "現金を隠すため", "販売価格を自動決定するため"], 0, "価格差異・数量差異・能率差異などを分けると、材料価格なのか、使用量なのか、作業効率なのかを考えられます。", { tags: ["標準原価", "差異分析"] }),
    q(6, unit, "multiple", "直接原価計算が意思決定に向く場面をすべて選んでください。", ["短期の追加注文を受けるか", "商品ミックスを比べるか", "長期の設備投資を固定費なしで判断する", "限界利益を比べるか"], [0, 1, 3], "短期意思決定では、変動費と限界利益が有用です。長期では固定費や投資も含めて考えます。", { tags: ["直接原価計算"] }),
    q(7, unit, "number", `製品Aの販売価格${50 + n * 2}万円、単位変動費${30 + n}万円。1個あたり限界利益は？`, null, 20 + n, "単位限界利益 ＝ 販売価格 − 単位変動費。", { unit: "万円", tags: ["限界利益"], tolerance: 0.01 }),
    q(8, unit, "single", "工場の稼働率が上がっても、短期に利益が増えない場合の仮説は？", ["追加売上より変動費・追加固定費・不良損が大きい", "売上は必ず利益になる", "固定費は存在しない", "在庫は必ず現金になる"], 0, "稼働率だけでなく、追加売上に対する限界利益、不良、残業、追加設備などを確認します。", { tags: ["推測", "製造"] }),
    q(9, unit, "single", "工業簿記を財務諸表へつなぐとき、製造途中の原価はどこに残る？", ["仕掛品や製品などの棚卸資産", "必ず当期費用", "必ず現金", "必ず売上"], 0, "まだ販売されていない製造原価は、仕掛品・製品などの在庫としてBSに残り、販売時に売上原価へ振り替わります。", { tags: ["仕掛品", "棚卸資産"] })
  ];
}

function profileFor(unit) {
  return statementProfiles[unit.index % statementProfiles.length];
}

function statementQuestions(unit) {
  const p = profileFor(unit);
  const grossRate = Math.round((p.gross / p.sales) * 1000) / 10;
  const opRate = Math.round((p.op / p.sales) * 1000) / 10;
  const currentAssets = p.cash + p.receivables + p.inventory + 130;
  const currentLiabilities = Math.round(p.debt * 0.45);
  const workingCapital = p.receivables + p.inventory - Math.round(p.debt * 0.2);
  return [
    q(0, unit, "single", `${p.name}の決算データを読むとき、まず三表のどの関係を確認する？`, ["PLの利益と営業CFのつながり", "社名の知名度", "株価だけ", "従業員の趣味"], 0, `売上・利益だけでなく、${p.op}百万円の営業利益が${p.opcf}百万円の営業CFにどうつながるかを見ます。`, { tags: ["三表連動", p.name], sourceNote: "演習用決算データ" }),
    q(1, unit, "number", `${p.name}：売上高${p.sales}百万円、売上総利益${p.gross}百万円。粗利率は何％？`, null, grossRate, "粗利率 ＝ 売上総利益 ÷ 売上高 × 100。", { unit: "%", tags: ["粗利率", p.name], tolerance: 0.1, sourceNote: "演習用決算データ" }),
    q(2, unit, "number", `${p.name}：売上高${p.sales}百万円、営業利益${p.op}百万円。営業利益率は何％？`, null, opRate, "営業利益率 ＝ 営業利益 ÷ 売上高 × 100。", { unit: "%", tags: ["営業利益率", p.name], tolerance: 0.1, sourceNote: "演習用決算データ" }),
    q(3, unit, "single", `${p.name}の営業利益${p.op}百万円に対し営業CF${p.opcf}百万円。最も妥当な読みは？`, ["利益と現金創出の差を確認する必要がある", "利益と現金は必ず同じ", "営業CFは投資CFを表す", "現金が多ければ利益は不要"], 0, `営業利益と営業CFの差には、売掛金・在庫・減価償却などが影響します。差の理由をBSと注記で確認します。`, { tags: ["営業CF", p.name], sourceNote: "演習用決算データ" }),
    q(4, unit, "multiple", `${p.name}の資金繰りを読むときに確認する項目をすべて選んでください。`, ["売掛金の回収", "在庫の増減", "営業CF", "会社ロゴの色"], [0, 1, 2], "売掛金・在庫・営業CFは、利益が現金化しているかを読む基本項目です。", { tags: ["資金繰り", p.name], sourceNote: "演習用決算データ" }),
    q(5, unit, "number", `${p.name}：売掛金${p.receivables}百万円、在庫${p.inventory}百万円、短期負債控除額${Math.round(p.debt * 0.2)}百万円。簡易運転資金はいくら？`, null, workingCapital, "簡易運転資金 ＝ 売掛金 ＋ 在庫 − 仕入債務などの短期負債。", { unit: "百万円", tags: ["運転資金", p.name], tolerance: 0.01, sourceNote: "演習用決算データ" }),
    q(6, unit, "number", `${p.name}：現金${p.cash}、売掛金${p.receivables}、在庫${p.inventory}、その他流動資産130。流動資産合計は？`, null, currentAssets, "流動資産の内訳を足し上げます。単位をそろえることが大切です。", { unit: "百万円", tags: ["BS", p.name], tolerance: 0.01, sourceNote: "演習用決算データ" }),
    q(7, unit, "single", `${p.name}の投資CFが設備投資${p.capex}百万円を含むとき、次に確認するべきものは？`, ["投資が将来の売上・利益・営業CFに結びつくか", "投資額だけを見て善悪を決める", "投資CFは必ず悪い", "設備投資はPLに全額費用計上される"], 0, "投資は額の大きさだけでなく、将来のキャッシュ創出と減価償却負担まで見ます。", { tags: ["投資CF", p.name], sourceNote: "演習用決算データ" }),
    q(8, unit, "multiple", `${p.name}の決算で、追加調査の仮説になる兆候をすべて選んでください。`, ["売上増に対して売掛金がより速く増える", "利益が増えているのに営業CFが弱い", "借入が増え続ける", "単位の確認"], [0, 1, 2, 3], "兆候は断定ではなく仮説です。会計方針、回収条件、投資計画、借入目的を追加確認します。", { tags: ["推測", p.name], sourceNote: "演習用決算データ" }),
    q(9, unit, "single", `${p.name}の財務諸表を経営者に質問するとしたら、最も良い問いは？`, ["この利益はいつ現金になり、何がボトルネックか", "売上は大きいかだけ", "数字を見ずに大丈夫か", "競合の社名は何か"], 0, "良い読解は数字の評価で止まらず、現金化・再現性・事業ドライバーへの質問に変わります。", { tags: ["経営質問", p.name], sourceNote: "演習用決算データ" })
  ];
}

function analysisQuestions(unit) {
  const n = unit.index + 1;
  const sales = 900 + n * 80;
  const profit = 45 + n * 8;
  const assets = 700 + n * 50;
  const equity = 280 + n * 15;
  const currentAssets = 360 + n * 20;
  const currentLiabilities = 240 + n * 10;
  return [
    q(0, unit, "number", `売上高${sales}百万円、利益${profit}百万円。売上高利益率は何％？`, null, Math.round((profit / sales) * 1000) / 10, "利益率 ＝ 利益 ÷ 売上高 × 100。", { unit: "%", tags: ["収益性"], tolerance: 0.1 }),
    q(1, unit, "number", `売上高${sales}百万円、売上原価${Math.round(sales * 0.62)}百万円。粗利率は何％？`, null, Math.round(((sales - Math.round(sales * 0.62)) / sales) * 1000) / 10, "粗利率 ＝ (売上高 − 売上原価) ÷ 売上高 × 100。", { unit: "%", tags: ["粗利率"], tolerance: 0.1 }),
    q(2, unit, "number", `総資産${assets}百万円、売上高${sales}百万円。総資産回転率は何回？`, null, Math.round((sales / assets) * 100) / 100, "総資産回転率 ＝ 売上高 ÷ 総資産。", { unit: "回", tags: ["効率性"], tolerance: 0.01 }),
    q(3, unit, "number", `流動資産${currentAssets}百万円、流動負債${currentLiabilities}百万円。流動比率は何％？`, null, Math.round((currentAssets / currentLiabilities) * 1000) / 10, "流動比率 ＝ 流動資産 ÷ 流動負債 × 100。", { unit: "%", tags: ["安全性"], tolerance: 0.1 }),
    q(4, unit, "number", `自己資本${equity}百万円、総資産${assets}百万円。自己資本比率は何％？`, null, Math.round((equity / assets) * 1000) / 10, "自己資本比率 ＝ 自己資本 ÷ 総資産 × 100。", { unit: "%", tags: ["安全性"], tolerance: 0.1 }),
    q(5, unit, "number", `利益${profit}百万円、総資産${assets}百万円。簡易ROAは何％？`, null, Math.round((profit / assets) * 1000) / 10, "簡易ROA ＝ 利益 ÷ 総資産 × 100。実務では分子・分母の定義を確認します。", { unit: "%", tags: ["ROA"], tolerance: 0.1 }),
    q(6, unit, "number", `利益${profit}百万円、自己資本${equity}百万円。簡易ROEは何％？`, null, Math.round((profit / equity) * 1000) / 10, "簡易ROE ＝ 当期利益 ÷ 自己資本 × 100。", { unit: "%", tags: ["ROE"], tolerance: 0.1 }),
    q(7, unit, "multiple", "財務分析で比率を計算した後に行うべきことをすべて選んでください。", ["前年・同業・計画と比較する", "分子と分母の中身を確認する", "会計方針や季節性を確認する", "単独の数字だけで断定する"], [0, 1, 2], "比率は問いの入口です。比較軸と中身を確認して、原因仮説へ進みます。", { tags: ["分析の手順"] }),
    q(8, unit, "single", "ROEが高い会社を見たとき、必ずしも優良と断定できない理由は？", ["負債を多く使うことで自己資本が小さく見える場合があるから", "ROEは利益と無関係だから", "ROEは計算不能だから", "売上が必ず減るから"], 0, "ROEは利益率・資産効率・財務レバレッジに分解して、どの要因で高いのかを見ます。", { tags: ["ROE", "デュポン"] }),
    q(9, unit, "single", "比率の異常値を見つけた後の最も良い行動は？", ["元データ・定義・期間・注記を確認し、仮説を検証する", "すぐに不正と断定する", "数字を無視する", "比率だけをSNSへ出す"], 0, "推測は、異常値→仮説→追加確認→判断の順で進めます。", { tags: ["異常発見"] })
  ];
}

function capitalQuestions(unit) {
  const n = unit.index + 1;
  const sales = 1000 + n * 100;
  const op = 100 + n * 10;
  const invested = 700 + n * 50;
  const equity = 400 + n * 20;
  const netProfit = 60 + n * 6;
  return [
    q(0, unit, "number", `営業利益${op}百万円、投下資本${invested}百万円。簡易ROIは何％？`, null, Math.round((op / invested) * 1000) / 10, "ROI ＝ 投資から得た利益 ÷ 投資額。ここでは営業利益を用いる簡易問題です。", { unit: "%", tags: ["ROI"], tolerance: 0.1 }),
    q(1, unit, "number", `当期利益${netProfit}百万円、自己資本${equity}百万円。ROEは何％？`, null, Math.round((netProfit / equity) * 1000) / 10, "ROE ＝ 当期利益 ÷ 自己資本 × 100。", { unit: "%", tags: ["ROE"], tolerance: 0.1 }),
    q(2, unit, "number", `NOPAT${op * 0.7}百万円、投下資本${invested}百万円。ROICは何％？`, null, Math.round(((op * 0.7) / invested) * 1000) / 10, "ROIC ＝ 税引後営業利益（NOPAT）÷ 投下資本 × 100。", { unit: "%", tags: ["ROIC"], tolerance: 0.1 }),
    q(3, unit, "number", `営業利益${op}百万円、減価償却費${20 + n * 3}百万円。EBITDAは？`, null, op + 20 + n * 3, "EBITDA ＝ EBITに近い営業利益 ＋ 減価償却費。企業間の資産保有差をならして見る指標です。", { unit: "百万円", tags: ["EBITDA", "EVIDAではなくEBITDA"], tolerance: 0.01 }),
    q(4, unit, "single", "EBITDAだけを見て企業の価値や安全性を断定できない理由は？", ["設備投資・運転資金・利息・税金の現金負担を含まないから", "売上を含まないから", "利益と無関係だから", "必ず現金残高と一致するから"], 0, "EBITDAはキャッシュ創出力の一側面です。設備投資、運転資金、利息、税金、借入返済まで確認します。", { tags: ["EBITDA"] }),
    q(5, unit, "single", "ROICがWACCを上回る状態の一般的な意味は？", ["投下資本が資本コストを上回るリターンを生んでいる", "必ず現金が増える", "負債がゼロ", "売上が最大"], 0, "ROIC−WACCがプラスなら、投下資本が要求される資本コストを上回る価値創造の可能性があります。", { tags: ["ROIC", "WACC"] }),
    q(6, unit, "number", `投下資本${invested}百万円、ROIC10％、WACC6％。簡易EVAは？`, null, invested * 0.04, "簡易EVA ＝ (ROIC − WACC) × 投下資本。", { unit: "百万円", tags: ["EVA"], tolerance: 0.01 }),
    q(7, unit, "multiple", "ROEを改善する施策を考えるときの観点をすべて選んでください。", ["利益率を上げる", "資産効率を上げる", "過度でない範囲で資本構成を見直す", "借入を増やせば必ずよいと考える"], [0, 1, 2], "デュポン分解で、利益率・総資産回転率・財務レバレッジを分けて考えます。借入の増加はリスクも増やします。", { tags: ["ROE", "デュポン"] }),
    q(8, unit, "single", "ROIとROEの違いとして最も適切なものは？", ["ROIは投資・事業単位、ROEは自己資本に対する利益を見る指標", "ROIは売上、ROEは現金だけを見る", "両者は常に同じ", "ROEは費用を含まない"], 0, "分母が何かを意識します。指標名だけでなく、分子・分母・期間・範囲を定義します。", { tags: ["ROI", "ROE"] }),
    q(9, unit, "single", "資本効率を読むとき、最初に揃えるべき情報は？", ["指標の定義、対象期間、分子・分母、会計方針", "会社のロゴ", "株主の人数だけ", "前年の売上だけ"], 0, "同じROIC・EBITDAでも、定義や期間が違えば比較できません。まず計算の前提を揃えます。", { tags: ["指標定義"] })
  ];
}

function mgQuestions(unit) {
  const n = unit.index + 1;
  const sales = 800 + n * 60;
  const variable = Math.round(sales * 0.55);
  const fixed = 240 + n * 10;
  return [
    q(0, unit, "number", `売上高${sales}万円、変動費${variable}万円。限界利益はいくら？`, null, sales - variable, "限界利益 ＝ 売上高 − 変動費。", { unit: "万円", tags: ["限界利益"], tolerance: 0.01 }),
    q(1, unit, "number", `売上高${sales}万円、限界利益${sales - variable}万円。限界利益率は何％？`, null, Math.round(((sales - variable) / sales) * 1000) / 10, "限界利益率 ＝ 限界利益 ÷ 売上高 × 100。", { unit: "%", tags: ["限界利益率"], tolerance: 0.1 }),
    q(2, unit, "number", `固定費${fixed}万円、限界利益率45％。損益分岐点売上高は？`, null, Math.round((fixed / 0.45) * 100) / 100, "損益分岐点売上高 ＝ 固定費 ÷ 限界利益率。", { unit: "万円", tags: ["損益分岐点"], tolerance: 0.01 }),
    q(3, unit, "number", `固定費${fixed}万円、目標利益${80 + n * 5}万円、限界利益率45％。必要売上高は？`, null, Math.round(((fixed + 80 + n * 5) / 0.45) * 100) / 100, "必要売上高 ＝ (固定費 ＋ 目標利益) ÷ 限界利益率。", { unit: "万円", tags: ["目標利益"], tolerance: 0.01 }),
    q(4, unit, "multiple", "限界利益を増やす施策をすべて選んでください。", ["販売単価を上げる", "変動費単価を下げる", "売上数量を増やす", "固定費を増やすだけ"], [0, 1, 2], "固定費は営業利益に影響しますが、限界利益そのものは売上と変動費で決まります。", { tags: ["限界利益"] }),
    q(5, unit, "single", "値下げで数量が増えるかを判断するとき、見るべきものは？", ["値下げ後の追加限界利益が固定費・機会費用を上回るか", "売上高だけ", "数量だけ", "値下げ率だけ"], 0, "数量増による限界利益と、単価低下による既存商品の利益減、追加費用、機会費用を比較します。", { tags: ["値下げ", "意思決定"] }),
    q(6, unit, "number", `特別注文の追加売上${100 + n * 10}万円、追加変動費${60 + n * 5}万円、追加固定費10万円。差額利益は？`, null, 30 + n * 5, "差額利益 ＝ 追加売上 − 追加変動費 − 追加固定費。", { unit: "万円", tags: ["特別注文"], tolerance: 0.01 }),
    q(7, unit, "single", "商品ミックスを変える判断で重要な制約はどれ？", ["ボトルネック資源1単位あたりの限界利益", "売上高の大きさだけ", "商品名の長さ", "固定費を無視すること"], 0, "機械時間や人員など制約資源がある場合、資源1単位あたりの限界利益で優先順位を考えます。", { tags: ["商品ミックス"] }),
    q(8, unit, "multiple", "予算と実績の差異を分解するときの観点をすべて選んでください。", ["数量差異", "単価差異", "変動費率差異", "気分差異だけ"], [0, 1, 2], "売上数量・単価、変動費率、固定費の発生額などに分けると、次の行動が見えます。", { tags: ["予実管理"] }),
    q(9, unit, "single", "MGの数字を経営に使うときの注意点は？", ["限界利益だけでなく、現金・固定費・能力制約・時間軸も確認する", "限界利益が高ければ必ず現金も多い", "固定費は存在しない", "短期判断を長期判断へそのまま使う"], 0, "管理会計は意思決定の道具です。短期と長期、会計利益と現金、能力制約を分けて考えます。", { tags: ["MG", "実務"] })
  ];
}

function inferenceQuestions(unit) {
  const n = unit.index + 1;
  return [
    q(0, unit, "single", `単元「${unit.title}」で数字から推測するとき、最初に置くべき姿勢は？`, ["一つの兆候で断定せず、複数の数字と注記で仮説を検証する", "数字が大きければ成功と断定する", "利益だけを見る", "会社名だけで判断する"], 0, "財務分析は推測の入口です。兆候を見つけ、別の資料で仮説を検証します。", { tags: ["推測", "仮説"] }),
    q(1, unit, "multiple", "売上が伸びているのに資金繰りが悪化する仮説をすべて選んでください。", ["売掛金の回収前に売上が計上されている", "在庫を先に積み増している", "営業CFが利益に追いついていない", "売上増は必ず現金増を意味する"], [0, 1, 2], "成長は運転資金を必要とします。PLとCF、売掛金・在庫の増減を組み合わせます。", { tags: ["資金繰り"] }),
    q(2, unit, "single", "粗利率が急に改善したとき、追加で確認するものは？", ["商品構成・売価・原価計算方法・会計方針の変化", "社名", "社員食堂の数", "現金残高だけ"], 0, "粗利率は商品ミックス、価格、仕入条件、原価計算の影響を受けます。良化も原因分解が必要です。", { tags: ["粗利率"] }),
    q(3, unit, "multiple", "粉飾の可能性を示すとは限らないが、追加確認のきっかけになる兆候をすべて選んでください。", ["利益の増加に対して営業CFが継続的に弱い", "売掛金が売上より速く増える", "在庫が売上より速く増える", "注記が増えるだけで必ず不正"], [0, 1, 2], "これらは不正の断定ではなく、回収条件・在庫評価・会計方針・事業成長の実態を確認するサインです。", { tags: ["異常発見", "慎重さ"] }),
    q(4, unit, "number", `売上${1000 + n * 100}百万円、売掛金増加${120 + n * 10}百万円。売掛金増加の売上に対する割合は何％？`, null, Math.round(((120 + n * 10) / (1000 + n * 100)) * 1000) / 10, "売掛金増加 ÷ 売上高 × 100。単年だけでなく過去推移も確認します。", { unit: "%", tags: ["売掛金", "推測"], tolerance: 0.1 }),
    q(5, unit, "single", "借入金が増えている会社を読むときの良い質問は？", ["成長投資・運転資金・赤字補填のどれが目的で、返済原資は何か", "借入があるから悪いか", "借入が増えたから売上も増えるか", "金利だけを見ればよいか"], 0, "借入の良し悪しは目的、返済原資、金利、期限、CF、投資の成果で判断します。", { tags: ["借入", "財務CF"] }),
    q(6, unit, "single", "比率を比較するときに比較不能になりやすい要因は？", ["会計方針・決算期・事業構成・指標定義が違うこと", "会社名が違うことだけ", "数字があること", "注記を読むこと"], 0, "比較の前提を揃えないと、比率の差を事業差と誤認します。", { tags: ["比較"] }),
    q(7, unit, "multiple", "財務諸表から経営の仮説を作るときに有効な組合せをすべて選んでください。", ["PLの利益率＋BSの運転資金", "CFの現金増減＋投資計画", "注記＋セグメント情報", "一つの数字＋直感だけ"], [0, 1, 2], "複数の表と注記をつなぐと、原因と結果の仮説が立ちます。", { tags: ["三表", "仮説"] }),
    q(8, unit, "number", `営業利益${80 + n * 5}百万円、営業CF${40 + n * 3}百万円。営業CFの営業利益に対する割合は何％？`, null, Math.round(((40 + n * 3) / (80 + n * 5)) * 1000) / 10, "営業CF ÷ 営業利益 × 100。非現金費用や運転資金の影響を考える入口です。", { unit: "%", tags: ["CF変換", "推測"], tolerance: 0.1 }),
    q(9, unit, "single", "推測問題で「わからない」と判断することが正しいのはどんなとき？", ["必要な定義・期間・注記・内訳が不足しているとき", "難しい数字が出たとき", "利益が赤字のとき", "比率が100％を超えたとき"], 0, "推測は、わからない範囲を特定し、次に必要な資料を言えることまでが技能です。", { tags: ["情報不足", "判断"] })
  ];
}

function caseQuestions(unit) {
  const n = unit.index + 1;
  const p = statementProfiles[(n + 2) % statementProfiles.length];
  const fixed = 260 + n * 20;
  const cmr = 0.42 + (n % 3) * 0.04;
  return [
    q(0, unit, "single", `${unit.title}：売上${p.sales}百万円、営業利益${p.op}百万円、営業CF${p.opcf}百万円。最初に立てるべき仮説は？`, ["利益の質と現金化の差を、運転資金・投資・会計方針から確認する", "営業利益だけで成功と断定する", "営業CFだけで事業を判断する", "売上だけを増やす"], 0, "統合ケースでは、PL・BS・CF・注記をつなぎ、仮説と追加確認項目をセットで出します。", { tags: ["統合", p.name], sourceNote: "演習用決算データ" }),
    q(1, unit, "number", `固定費${fixed}万円、限界利益率${Math.round(cmr * 100)}％。損益分岐点売上高は？`, null, Math.round((fixed / cmr) * 100) / 100, "損益分岐点売上高 ＝ 固定費 ÷ 限界利益率。", { unit: "万円", tags: ["MG", "CVP"], tolerance: 0.01 }),
    q(2, unit, "number", `営業利益${p.op}百万円、減価償却費${25 + n * 3}百万円。簡易EBITDAは？`, null, p.op + 25 + n * 3, "簡易EBITDA ＝ 営業利益 ＋ 減価償却費。設備投資や運転資金も別に確認します。", { unit: "百万円", tags: ["EBITDA"], tolerance: 0.01 }),
    q(3, unit, "number", `NOPAT${Math.round(p.op * 0.7)}百万円、投下資本${500 + n * 40}百万円。簡易ROICは何％？`, null, Math.round((Math.round(p.op * 0.7) / (500 + n * 40)) * 1000) / 10, "ROIC ＝ NOPAT ÷ 投下資本 × 100。", { unit: "%", tags: ["ROIC"], tolerance: 0.1 }),
    q(4, unit, "multiple", "投資判断で追加確認するものをすべて選んでください。", ["投資額と回収期間", "追加売上・追加限界利益", "営業CFと返済能力", "売上が伸びるという希望だけ"], [0, 1, 2], "投資判断は、会計利益だけでなく差額CF、回収期間、資本コスト、返済能力を確認します。", { tags: ["投資判断"] }),
    q(5, unit, "single", "銀行借入を増やして投資するケースで、返済原資として見るものは？", ["投資後に生まれる営業CFと既存の返済負担", "売上高だけ", "EBITDAだけ", "自己資本比率だけ"], 0, "返済は現金で行います。営業CF、運転資金、投資CF、既存借入の返済を合わせて見ます。", { tags: ["借入", "返済"] }),
    q(6, unit, "number", `売上${p.sales}百万円、粗利${p.gross}百万円、販管費${p.gross - p.op}百万円。営業利益は？`, null, p.op, "営業利益 ＝ 売上総利益 − 販売費及び一般管理費。", { unit: "百万円", tags: ["PL構造"], tolerance: 0.01 }),
    q(7, unit, "single", "ケース分析の結論として良いものはどれ？", ["事実・仮説・追加確認・判断条件を分けて述べる", "最初の印象だけを断定する", "比率を一つだけ示す", "リスクを隠す"], 0, "実務では、観測事実と推測を分け、判断条件を明示することが重要です。", { tags: ["結論の作り方"] }),
    q(8, unit, "multiple", "財務諸表を読むときの反証を考える方法をすべて選んでください。", ["売掛金増加は成長投資の前兆か、回収遅延かを分ける", "在庫増加は出店準備か、滞留かを分ける", "営業CFの弱さは投資ではなく運転資金かを確認する", "自分の仮説に合う数字だけを見る"], [0, 1, 2], "同じ数字でも複数の説明があり得ます。反証となる情報を探すことで、推測の精度が上がります。", { tags: ["反証", "推測"] }),
    q(9, unit, "single", "この1単元を合格とする基準として最も厳密なものは？", ["計算でき、数字の意味を説明し、次に確認する資料と経営上の打ち手を言える", "答えの数字だけ合う", "公式を暗唱できる", "用語を見たことがある"], 0, "財務知識は、計算・説明・推測・意思決定までつながって初めて実務で使えます。", { tags: ["合格基準"] })
  ];
}

function makeQuestions(unit) {
  const map = { journal: journalQuestions, commercial: commercialQuestions, industrial: industrialQuestions, statements: statementQuestions, reading: statementQuestions, analysis: analysisQuestions, capital: capitalQuestions, mg: mgQuestions, inference: inferenceQuestions, case: caseQuestions };
  return map[unit.category](unit);
}

const questions = allUnits.flatMap(makeQuestions);
if (questions.length !== 1000) console.error(`問題数エラー: ${questions.length}`);
const questionById = Object.fromEntries(questions.map((question) => [question.id, question]));

const lessonGuides = {
  journal: {
    aim: "取引を見た瞬間に、何が増減したかを言葉にできるようにする。",
    core: "簿記は、会社の取引を「資産・負債・純資産・収益・費用」の変化として記録する技術です。仕訳は暗記ではなく、取引の意味を左右に置き換える作業です。",
    formula: "資産 ＝ 負債 ＋ 純資産 ／ 利益 ＝ 収益 − 費用",
    example: "現金で商品を100万円仕入れたら、商品（または仕入）が増え、現金が減る。まずこの2つの動きを口にしてから、借方・貸方へ置きます。",
    caution: "借入・出資・売上を同じ「お金が入った」と扱わない。利益と現金は別のものです。",
    recall: "この取引で増えたもの・減ったものは何か。利益に影響するか。"
  },
  commercial: {
    aim: "2級の会計処理を、経済実態・認識・測定・表示まで説明できるようにする。",
    core: "2級では、仕訳の形だけでなく「なぜその時点で、いくらを、どこに表示するのか」を考えます。会計上の利益と税務上の所得、個別と連結など、異なる視点を整理します。",
    formula: "認識（いつ）→ 測定（いくら）→ 表示（どこに）",
    example: "グループ会社間の売買は、個別会社では売上・仕入に見えても、連結では内部取引です。グループ外との取引だけが残るように消去します。",
    caution: "会計方針・保有目的・注記を見ずに、数字や仕訳だけで結論を出さない。",
    recall: "この処理は、経済実態を何として表しているか。個別と連結で見え方は変わるか。"
  },
  industrial: {
    aim: "原価が材料・人・設備を通って製品と利益へ変わる流れを追えるようにする。",
    core: "工業簿記は、製造に使った資源を製品へ集計する学習です。材料費・労務費・経費を、直接費と間接費に分け、仕掛品・製品・売上原価へ流します。",
    formula: "製造原価 ＝ 材料費 ＋ 労務費 ＋ 経費 ／ 限界利益 ＝ 売上 − 変動費",
    example: "まだ売れていない製品の原価は、すぐ費用にせず、仕掛品や製品としてBSに残ります。販売された時点で売上原価になります。",
    caution: "稼働率や売上だけで判断しない。限界利益、不良、残業、追加設備まで確認する。",
    recall: "この原価はどの製品に、どの基準で負担させるか。短期判断か長期判断か。"
  },
  statements: {
    aim: "BS・PL・CFを、同じ会社の1つの物語としてつなげて読めるようにする。",
    core: "BSは決算日時点の財産、PLは一定期間のもうけ、CFは一定期間の現金の動きです。利益が出ても現金が増えるとは限らないため、3表を行き来します。",
    formula: "BS＝時点 ／ PL＝期間 ／ CF＝期間",
    example: "売上を計上してもまだ入金されていなければ、PLの利益は増え、BSの売掛金も増えます。営業CFでは、売掛金の増加が現金を押し下げます。",
    caution: "利益・現金・純資産を同じものだと思わない。対象期間、決算日、単位も最初に確認する。",
    recall: "利益はどこに残ったか。現金になったか。BSのどの項目が動いたか。"
  },
  reading: {
    aim: "実際の決算データから、事実・仮説・追加確認を分けて話せるようにする。",
    core: "財務諸表の読解は、数字の大小を評価するだけではありません。増減の方向、売上との関係、現金化の速度、注記やセグメントをつないで、次に確かめる問いを作ります。",
    formula: "事実 → 仮説 → 反証 → 追加資料 → 判断",
    example: "売上が増えているのに売掛金がさらに速く増えていたら、成長による自然な増加か、回収遅延かを分けます。売上計上基準、回収条件、滞留状況を確認します。",
    caution: "一つの兆候だけで粉飾や失敗と断定しない。同じ数字を説明する別の仮説を置く。",
    recall: "見えている事実は何か。仮説は何か。反証する資料は何か。"
  },
  analysis: {
    aim: "比率を計算して終わらず、比較と原因の問いへ変えられるようにする。",
    core: "財務比率は、会社を診断する最終回答ではなく、調べる場所を見つける地図です。前年・同業・計画と比較し、分子と分母の中身、会計方針、季節性を確認します。",
    formula: "比率 ＝ 分子 ÷ 分母 ／ ROE ＝ 利益率 × 資産回転率 × 財務レバレッジ",
    example: "ROEが高くても、利益率が高いのか、資産を効率よく使っているのか、自己資本が小さいのかで意味は変わります。デュポン分解で原因を分けます。",
    caution: "定義の違う比率、決算期や事業構成の違う会社を、そのまま比較しない。",
    recall: "分子と分母は何か。何と比べたか。変化の原因はどこにあるか。"
  },
  capital: {
    aim: "利益の大きさではなく、投じた資本に対して価値を生んだかを判断できるようにする。",
    core: "ROEは株主資本、ROICは事業に投じた資本、ROIは投資の採算を見る指標です。EBITDAは現金創出力の近似に使われますが、投資や運転資金を無視する万能利益ではありません。",
    formula: "ROE ＝ 当期利益 ÷ 自己資本 ／ ROIC ＝ NOPAT ÷ 投下資本 ／ EBITDA ＝ EBIT ＋ 減価償却費",
    example: "ROICが資本コストWACCを上回れば、投資家が求めるリターンを超えて価値を生む方向です。下回るなら、利益率・回転率・資本の使い方を分解します。",
    caution: "EBITDAをそのままキャッシュフローや返済可能額とみなさない。税金、投資、運転資金、借入返済を別に見る。",
    recall: "分子は誰の利益か。分母は何に投じた資本か。資本コストを超えたか。"
  },
  mg: {
    aim: "限界利益と固定費から、売上を増やすだけではない打ち手を選べるようにする。",
    core: "管理会計では、売上から変動費を引いた限界利益で、固定費をどれだけ回収できるかを見ます。損益分岐点、目標利益、商品ミックスを使って意思決定します。",
    formula: "限界利益 ＝ 売上 − 変動費 ／ 損益分岐点売上高 ＝ 固定費 ÷ 限界利益率",
    example: "限界利益率50％、固定費300万円なら、損益分岐点売上高は600万円です。売上を増やすだけでなく、単価・変動費・固定費のどれを動かすかを考えます。",
    caution: "短期の特別注文と長期の価格政策を同じ基準で判断しない。追加固定費と機会費用も確認する。",
    recall: "この判断で増える売上・変動費・固定費・限界利益はいくらか。"
  },
  inference: {
    aim: "数字の裏側に複数の仮説を置き、必要な資料を指定できるようにする。",
    core: "財務の推測は、断定ではなく仮説検証です。異常値を見つけたら、定義・期間・内訳・注記を確認し、反証になる情報も探します。",
    formula: "異常値 → 仮説を複数置く → 反証を探す → 資料で検証",
    example: "利益が増えているのに営業CFが弱いなら、売掛金や在庫の増加、前受・仕入債務、非現金項目など、複数の原因を分けて確認します。",
    caution: "不正・失敗・成功を、1つの比率や印象だけで決めない。わからない範囲を言えることも能力です。",
    recall: "事実と推測を分けたか。別の説明はあるか。次に何を見れば判定できるか。"
  },
  case: {
    aim: "財務三表・管理会計・資本効率をつないで、判断条件つきの結論を出せるようにする。",
    core: "統合ケースでは、計算問題の正解だけでなく、事実・仮説・追加確認・打ち手を分けて結論にします。会社の目的や制約を確認してから意思決定します。",
    formula: "判断 ＝ 事実 ＋ 仮説 ＋ 追加確認 ＋ 条件つきの打ち手",
    example: "出店や借入を判断するときは、追加売上だけでなく、限界利益、投資額、回収期間、営業CF、既存借入の返済まで一つの表にまとめます。",
    caution: "売上成長やEBITDAだけを見て、投資・運転資金・返済能力を置き去りにしない。",
    recall: "いま確実に言える事実は何か。判断を変える条件は何か。"
  }
};

const unitLessonOverrides = {
  "簿記の全体像": "取引を仕訳し、勘定へ集計し、決算整理を行い、財務諸表へつなげる流れを先に覚えます。",
  "仕訳の基本": "借方・貸方は左右の名前です。増えたもの・減ったものを5要素に分類してから、左右へ置きます。",
  "BSの構造": "BSは決算日時点のスナップショットです。左側の資産が、どのような負債と純資産で支えられているかを読みます。",
  "PLの構造": "PLは一定期間の経営成績です。売上から売上原価、販管費などを引いて、どこで利益が残ったかを見ます。",
  "CFの構造": "CFは現金の増減を営業・投資・財務に分けます。利益が出ているのに現金がない理由を探す入口です。",
  "ROI": "ROIは投資に対してどれだけ利益を生んだかを測ります。投資額と利益の期間をそろえて比較します。",
  "ROE": "ROEは株主から預かった自己資本で、どれだけ利益を生んだかを示します。高い理由を利益率・回転率・レバレッジに分解します。",
  "ROIC": "ROICは事業に投じた資本が、税引後営業利益をどれだけ生んだかを見る指標です。WACCとの比較が重要です。",
  "EBITDA（正しい表記）": "EBITDAは営業利益に減価償却費を足した近似値です。設備投資や運転資金を引いていないため、現金そのものではありません。"
};

function lessonContentFor(unit) {
  const guide = lessonGuides[unit.category];
  const firstQuestion = questions.find((question) => question.unitId === unit.id);
  const focus = unitLessonOverrides[unit.title] || `${unit.title}を、${guide.aim}`;
  return { ...guide, focus, firstQuestion };
}

let state = loadState();
let selectedTrackId = "bookkeeping3";
let selectedUnitId = allUnits[0].id;
let testSession = null;

function defaultState() {
  return { questions: {}, attempts: 0, correct: 0, streak: 0, lastStudyDay: null, lessonNotes: {} };
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!saved || typeof saved !== "object") return defaultState();
    return { ...defaultState(), ...saved, questions: saved.questions || {}, lessonNotes: saved.lessonNotes || {} };
  } catch (error) {
    return defaultState();
  }
}

function saveState() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (error) { /* storage is optional */ }
}

function getQuestionState(id) {
  if (!state.questions[id]) state.questions[id] = { seen: 0, correct: 0, wrong: 0, streak: 0, lastResult: null, nextReviewAt: 0 };
  return state.questions[id];
}

function shuffle(items) { return [...items].sort(() => Math.random() - 0.5); }
function formatQuestionType(type) { return { single: "4択", multiple: "複数選択", number: "数値入力" }[type]; }
function formatAnswer(question) {
  if (question.type === "number") return `${question.answer.toLocaleString("ja-JP")}${question.unit || ""}`;
  return (Array.isArray(question.answer) ? question.answer : [question.answer]).map((index) => question.options[index]).join(" ／ ");
}

function markStudyDay() {
  const today = new Date().toISOString().slice(0, 10);
  if (state.lastStudyDay === today) return;
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  state.streak = state.lastStudyDay === yesterday ? state.streak + 1 : 1;
  state.lastStudyDay = today;
}

function getMasteryRate() {
  const score = questions.reduce((total, question) => {
    const item = state.questions[question.id];
    if (!item || !item.seen) return total;
    return total + (item.streak >= 2 && item.lastResult === "correct" ? 1 : 0.35);
  }, 0);
  return Math.round((score / questions.length) * 100);
}

function getReviewIds() {
  const now = Date.now();
  return questions.filter((question) => {
    const item = state.questions[question.id];
    return item && item.seen && (item.lastResult === "wrong" || item.streak < 2 || item.nextReviewAt <= now);
  }).sort((a, b) => {
    const aState = state.questions[a.id];
    const bState = state.questions[b.id];
    return (aState.lastResult === "wrong" ? -1 : 0) - (bState.lastResult === "wrong" ? -1 : 0) || aState.streak - bState.streak;
  }).map((question) => question.id);
}

function trackStats(track) {
  const ids = track.units.flatMap((unit) => questions.filter((question) => question.unitId === unit.id).map((question) => question.id));
  const answered = ids.filter((id) => state.questions[id]?.seen).length;
  const mastered = ids.filter((id) => state.questions[id]?.streak >= 2 && state.questions[id]?.lastResult === "correct").length;
  return { total: ids.length, answered, mastered };
}

function getRecommendedUnit() {
  for (let index = 0; index < allUnits.length; index += 1) {
    const unit = allUnits[index];
    const mastered = questions.filter((question) => question.unitId === unit.id).every((question) => state.questions[question.id]?.streak >= 2 && state.questions[question.id]?.lastResult === "correct");
    if (mastered) continue;
    if (index === 0) return unit;
    const previous = allUnits[index - 1];
    const previousMastered = questions.filter((question) => question.unitId === previous.id).every((question) => state.questions[question.id]?.streak >= 2 && state.questions[question.id]?.lastResult === "correct");
    if (previousMastered) return unit;
    return previous;
  }
  return allUnits[allUnits.length - 1];
}

function updateTopIndicators() {
  const mastery = getMasteryRate();
  const reviewCount = getReviewIds().length;
  document.querySelector("#mastery-rate").textContent = mastery;
  document.querySelector("#mastery-bar").style.width = `${mastery}%`;
  document.querySelector("#review-count").textContent = reviewCount;
  document.querySelector("#streak-count").textContent = state.streak;
  document.querySelector("#mastery-copy").textContent = mastery === 0 ? "まずは1問。正解の理由まで言葉にするところから。" : `${reviewCount}問が復習候補。1,000問を、10問単位で積み上げます。`;
  const recommended = getRecommendedUnit();
  document.querySelector("#next-move-title").textContent = reviewCount ? "弱点から再テスト" : `LEVEL ${String(recommended.learningLevel).padStart(2, "0")} ／ ${recommended.title}`;
  document.querySelector("#next-move-copy").textContent = reviewCount ? `${reviewCount}問の復習候補から、優先度の高い問題を出題します。` : `${recommended.learningLevelTitle}。前の単元を固めてから、次へ進みます。`;
}

function renderHomeModules() {
  const root = document.querySelector("#home-module-grid");
  root.innerHTML = tracks.map((track, index) => {
    const stats = trackStats(track);
    const status = stats.mastered === stats.total ? "MASTERED" : stats.answered ? `${stats.mastered}/${stats.total} 定着` : "未着手";
    const levelStart = track.units[0].learningLevel;
    const levelEnd = track.units[track.units.length - 1].learningLevel;
    const levelLabel = levelStart === levelEnd ? `LEVEL ${String(levelStart).padStart(2, "0")}` : `LEVEL ${String(levelStart).padStart(2, "0")}–${String(levelEnd).padStart(2, "0")}`;
    return `<button class="module-card" type="button" data-track-id="${track.id}"><div class="module-card-top"><span class="module-code">${String(index + 1).padStart(2, "0")} ／ ${track.title}</span><span class="module-status">${status}</span></div><div><h3>${track.subtitle}</h3><p>${levelLabel} · ${track.description} <strong>${track.units.length}単元・${track.units.length * 10}問</strong></p></div></button>`;
  }).join("");
  root.querySelectorAll("[data-track-id]").forEach((button) => button.addEventListener("click", () => { selectedTrackId = button.dataset.trackId; selectedUnitId = trackById[selectedTrackId].units[0].id; showView("learn"); renderLearn(); }));
}

function unitButtonHtml(unit) {
  const unitQuestions = questions.filter((question) => question.unitId === unit.id);
  const mastered = unitQuestions.filter((question) => state.questions[question.id]?.streak >= 2 && state.questions[question.id]?.lastResult === "correct").length;
  return `<button class="unit-card ${unit.id === selectedUnitId ? "is-active" : ""}" type="button" data-unit-id="${unit.id}"><span class="unit-card-code">LEVEL ${String(unit.learningLevel).padStart(2, "0")} ／ ${unit.learningLevelTitle}</span><strong>${unit.title}</strong><small>${mastered}/10 定着 · 10問構成</small></button>`;
}

function renderLearn() {
  const list = document.querySelector("#learn-module-list");
  list.innerHTML = tracks.map((track, index) => { const start = track.units[0].learningLevel; const end = track.units[track.units.length - 1].learningLevel; const levelLabel = start === end ? `LEVEL ${String(start).padStart(2, "0")}` : `LEVEL ${String(start).padStart(2, "0")}–${String(end).padStart(2, "0")}`; return `<button class="module-list-button ${track.id === selectedTrackId ? "is-active" : ""}" type="button" data-track-id="${track.id}"><span class="module-list-index">${String(index + 1).padStart(2, "0")}</span><span class="module-list-title">${track.title}<small class="module-list-subtitle">${levelLabel} · ${track.units.length}単元</small></span></button>`; }).join("");
  list.querySelectorAll("[data-track-id]").forEach((button) => button.addEventListener("click", () => { selectedTrackId = button.dataset.trackId; selectedUnitId = trackById[selectedTrackId].units[0].id; renderLearn(); }));

  const track = trackById[selectedTrackId];
  const unit = unitById[selectedUnitId] || track.units[0];
  selectedUnitId = unit.id;
  const stats = trackStats(track);
  const lesson = document.querySelector("#lesson-area");
  lesson.innerHTML = `<article class="lesson-sheet"><p class="lesson-kicker">${track.code} ／ ${track.level}</p><h2>${track.title}</h2><p class="lesson-intro">${track.description} LEVEL ${String(track.units[0].learningLevel).padStart(2, "0")}から順番に進み、1単元を10問で区切って固めます。現在、${stats.mastered}/${stats.total}問が定着候補です。</p><div class="lesson-rule"></div><div class="unit-grid">${track.units.map(unitButtonHtml).join("")}</div><div class="lesson-rule"></div><div id="selected-unit-lesson"></div></article>`;
  lesson.querySelectorAll("[data-unit-id]").forEach((button) => button.addEventListener("click", () => { selectedUnitId = button.dataset.unitId; renderLearn(); }));
  const selectedLesson = lesson.querySelector("#selected-unit-lesson");
  const content = lessonContentFor(unit);
  const guided = content.firstQuestion;
  selectedLesson.innerHTML = `<div class="lesson-study-grid"><section class="lesson-block lesson-block-primary"><p class="lesson-kicker">LEVEL ${String(unit.learningLevel).padStart(2, "0")} ／ ${unit.learningLevelTitle} ／ STUDY</p><h3>${unit.title}</h3><p class="lesson-goal"><strong>この単元のゴール：</strong>${content.aim}</p><p>${content.focus}</p><p>${content.core}</p></section><aside class="formula-panel"><p class="micro-label">まず覚える軸</p><div class="lesson-formula"><strong>01</strong><span>${content.formula}</span></div><div class="lesson-formula"><strong>02</strong><span>数字の動きを言葉にする</span></div><div class="lesson-formula"><strong>03</strong><span>三表・注記で確かめる</span></div><div class="lesson-formula"><strong>04</strong><span>判断条件まで言う</span></div></aside></div><div class="lesson-rule"></div><section class="worked-example"><div class="worked-example-head"><p class="lesson-kicker">GUIDED EXAMPLE ／ ${formatQuestionType(guided.type)}</p><span>答えを先に見ずに考える</span></div><h4>${guided.prompt}</h4><p class="example-hint">${content.example}</p><details><summary>答えと解説を開く</summary><p><strong>答え：</strong>${formatAnswer(guided)}</p><p>${guided.explanation}</p></details></section><div class="lesson-study-grid lesson-study-grid-secondary"><section class="lesson-block lesson-block-soft"><p class="micro-label">注意すること</p><p>${content.caution}</p></section><section class="lesson-block lesson-recall"><p class="micro-label">自分の言葉で思い出す</p><p>${content.recall}</p><textarea id="lesson-note" rows="4" placeholder="ここに自分の説明を書いてください"></textarea><div class="lesson-note-actions"><button class="button button-secondary" type="button" id="save-lesson-note">学習メモを保存</button><span id="lesson-note-status" aria-live="polite"></span></div></section></div><div class="lesson-check"><p class="micro-label">PASS CONDITION</p><p>①講義を読む → ②例題を説明する → ③自分の言葉でメモする → ④10問を解く。10問を2回連続で理由つき正解にしてから、次の単元へ進みます。</p></div><div class="lesson-footer"><button class="button button-primary" type="button" id="start-unit-test">この単元を10問解く <span>→</span></button><button class="button button-secondary" type="button" id="start-track-test">この領域をテストする</button></div>`;
  const note = selectedLesson.querySelector("#lesson-note");
  note.value = state.lessonNotes?.[unit.id] || "";
  selectedLesson.querySelector("#save-lesson-note").addEventListener("click", () => { state.lessonNotes[unit.id] = note.value.trim(); saveState(); selectedLesson.querySelector("#lesson-note-status").textContent = "保存しました"; markStudyDay(); updateTopIndicators(); });
  selectedLesson.querySelector("#start-unit-test").addEventListener("click", () => startTest({ scope: `unit:${unit.id}`, count: 10, focusWeak: false }));
  selectedLesson.querySelector("#start-track-test").addEventListener("click", () => startTest({ scope: `track:${track.id}`, count: 10, focusWeak: true }));
}

function scopeOptionsHtml() {
  const recommended = getRecommendedUnit();
  return `<option value="unit:${recommended.id}" selected>おすすめ：LEVEL ${String(recommended.learningLevel).padStart(2, "0")} ／ ${recommended.title}（10問）</option><option value="all">全体（100単元・1,000問）</option>${tracks.map((track) => `<optgroup label="${track.title}（${track.units.length}単元・${track.units.length * 10}問）"><option value="track:${track.id}">${track.title} 全体</option>${track.units.map((unit) => `<option value="unit:${unit.id}">LEVEL ${String(unit.learningLevel).padStart(2, "0")} ／ ${unit.title}（10問）</option>`).join("")}</optgroup>`).join("")}`;
}

function renderTestLanding() {
  const area = document.querySelector("#test-area");
  area.innerHTML = `<div class="test-config"><p class="eyebrow">TEST CONFIGURATION ／ 1,000 QUESTIONS</p><h2>10問ずつ、答えの根拠まで。</h2><p>簿記3級から2級、財務諸表の読解、ROI・ROE・ROIC・EBITDA、MG、推測問題まで。1単元を10問で区切り、間違いを弱点復習へ戻します。</p><div class="test-config-meta"><span class="config-chip">100単元</span><span class="config-chip">1,000問</span><span class="config-chip">4択</span><span class="config-chip">複数選択</span><span class="config-chip">数値入力</span></div><div class="config-controls"><label><span class="field-label">出題範囲</span><select id="test-scope-select">${scopeOptionsHtml()}</select></label><label><span class="field-label">問題数</span><select id="test-count-select"><option value="10">10問（基本）</option><option value="20">20問</option><option value="40">40問</option><option value="100">100問</option></select></label></div><label class="checkbox-line"><input type="checkbox" id="focus-weak-checkbox" /><span>弱点・復習候補を優先する</span></label><button class="button button-primary" type="button" id="start-test-button">テストを開始する <span>→</span></button></div><div class="diagnostic-note"><strong>RULE</strong><p>単元を選んだ場合は10問を1セットとして出題します。数値問題は単位をそろえ、複数選択は正しいものをすべて選びます。財務諸表の読解では、答えの後に「次に何を確認するか」まで言葉にしてください。</p></div>`;
  const scope = area.querySelector("#test-scope-select");
  const count = area.querySelector("#test-count-select");
  scope.addEventListener("change", () => { if (scope.value.startsWith("unit:")) count.value = "10"; });
  area.querySelector("#start-test-button").addEventListener("click", () => startTest({ scope: scope.value, count: Number(count.value), focusWeak: area.querySelector("#focus-weak-checkbox").checked }));
}

function chooseTestQuestions({ scope, count, focusWeak }) {
  let candidates = questions;
  if (scope.startsWith("unit:")) candidates = questions.filter((question) => question.unitId === scope.slice(5));
  if (scope.startsWith("track:")) candidates = questions.filter((question) => question.trackId === scope.slice(6));
  if (focusWeak) {
    const reviewSet = new Set(getReviewIds());
    const weak = candidates.filter((question) => reviewSet.has(question.id));
    if (weak.length) candidates = weak;
  }
  const chosen = scope.startsWith("unit:") ? candidates : shuffle(candidates);
  return chosen.slice(0, Math.min(count, chosen.length));
}

function startTest(config) {
  const selected = chooseTestQuestions(config);
  if (!selected.length) { showToast("この条件の問題がありません。範囲を広げてください。"); return; }
  testSession = { ids: selected.map((question) => question.id), index: 0, score: 0, answered: 0, config };
  showView("test");
  renderQuestion();
}

function renderQuestion() {
  const area = document.querySelector("#test-area");
  const session = testSession;
  const question = questionById[session.ids[session.index]];
  const unit = unitById[question.unitId];
  const progress = Math.round((session.index / session.ids.length) * 100);
  const inputHtml = question.type === "number" ? `<div class="numeric-answer"><label class="field-label" for="numeric-answer">答えを入力</label><input class="number-input" id="numeric-answer" type="number" inputmode="decimal" step="any" aria-label="答え" /><span class="numeric-unit">${question.unit || ""}</span></div>` : `<div class="options-grid">${question.options.map((option, index) => `<label class="option-label"><input type="${question.type === "multiple" ? "checkbox" : "radio"}" name="answer" value="${index}" /><span class="option-mark">${question.type === "multiple" ? "□" : String.fromCharCode(65 + index)}</span><span class="option-copy">${option}</span></label>`).join("")}</div>`;
  area.innerHTML = `<div class="question-shell"><div class="question-topline"><span class="question-count">QUESTION ${String(session.index + 1).padStart(2, "0")} / ${String(session.ids.length).padStart(2, "0")}</span><span class="question-count">${unit.trackTitle} ／ ${unit.title}</span></div><div class="test-progress" aria-label="テスト進捗"><span style="width:${progress}%"></span></div><article class="question-card"><div class="question-meta"><span class="question-type">${formatQuestionType(question.type)}</span><span class="question-difficulty">${question.difficulty} ／ ${question.tags.join(" · ")}</span></div><h2>${question.prompt}</h2>${inputHtml}<div class="question-actions"><button class="button button-primary" type="button" id="submit-answer">採点する</button><span class="question-helper">理由を一言で説明してから採点。</span></div><div id="feedback-area"></div></article><div class="test-footer-row"><span>LEARN → RECALL → TEST → REPAIR</span><span>${question.sourceNote || unit.code}</span></div></div>`;
  area.querySelector("#submit-answer").addEventListener("click", () => submitAnswer(question));
}

function readAnswer(question) {
  const area = document.querySelector("#test-area");
  if (question.type === "number") { const input = area.querySelector("#numeric-answer"); return input.value === "" ? null : Number(input.value); }
  const checked = [...area.querySelectorAll("input[name='answer']:checked")].map((input) => Number(input.value));
  if (!checked.length) return null;
  return question.type === "multiple" ? checked : checked[0];
}

function isCorrect(question, answer) {
  if (question.type === "number") return Math.abs(answer - question.answer) <= question.tolerance;
  if (question.type === "single") return answer === question.answer;
  return [...answer].sort((a, b) => a - b).join(",") === [...question.answer].sort((a, b) => a - b).join(",");
}

function submitAnswer(question) {
  const answer = readAnswer(question);
  if (answer === null) { showToast(question.type === "number" ? "数値を入力してください。" : "答えを選んでください。"); return; }
  const correct = isCorrect(question, answer);
  const progress = getQuestionState(question.id);
  progress.seen += 1;
  progress.lastResult = correct ? "correct" : "wrong";
  progress.lastAnswer = answer;
  if (correct) { progress.correct += 1; progress.streak += 1; progress.nextReviewAt = Date.now() + (progress.streak >= 2 ? 7 * 86400000 : 86400000); state.correct += 1; } else { progress.wrong += 1; progress.streak = 0; progress.nextReviewAt = Date.now(); }
  state.attempts += 1;
  markStudyDay();
  saveState();
  testSession.answered += 1;
  if (correct) testSession.score += 1;
  document.querySelector("#submit-answer").disabled = true;
  document.querySelectorAll("#test-area input").forEach((input) => { input.disabled = true; });
  const feedback = document.querySelector("#feedback-area");
  feedback.innerHTML = `<div class="answer-feedback ${correct ? "" : "is-wrong"}"><h3>${correct ? "正解。ここは定着候補です。" : "不正解。ここを修復します。"}</h3><p>${question.explanation}</p><p class="answer-key">正解：${formatAnswer(question)}</p></div><div class="question-actions"><button class="button button-primary" type="button" id="next-question">${testSession.index + 1 === testSession.ids.length ? "結果を見る" : "次の問題へ"} <span>→</span></button></div>`;
  feedback.querySelector("#next-question").addEventListener("click", () => { if (testSession.index + 1 === testSession.ids.length) renderTestResult(); else { testSession.index += 1; renderQuestion(); } updateTopIndicators(); renderHomeModules(); });
  updateTopIndicators();
  renderHomeModules();
}

function renderTestResult() {
  const area = document.querySelector("#test-area");
  const total = testSession.ids.length;
  const rate = Math.round((testSession.score / total) * 100);
  const wrong = total - testSession.score;
  const message = rate === 100 ? "完璧。次は説明と推測へ。" : rate >= 70 ? "良い。間違えた論点を今日修復する。" : "ここからが本番。10問単位で戻る。";
  document.querySelector("#test-status-copy").textContent = `${total}問の回答が完了。解説を読み、弱点を確認します。`;
  area.innerHTML = `<div class="result-card"><p class="eyebrow">TEST COMPLETE</p><h2>${message}</h2><p>1,000問は、量で圧倒するためではなく、論点を小さく切って何度も再現するためにあります。弱点復習から、間違えた論点をもう一度解き直せます。</p><div class="result-meta"><div class="result-stat"><strong>${rate}%</strong><small>正答率</small></div><div class="result-stat"><strong>${testSession.score}/${total}</strong><small>正解数</small></div><div class="result-stat"><strong>${wrong}</strong><small>復習候補</small></div></div><div class="panel-actions"><button class="button button-primary" type="button" id="result-review">弱点を復習する <span>→</span></button><button class="button button-secondary" type="button" id="result-retry">同じ条件でもう一度</button></div></div>`;
  area.querySelector("#result-review").addEventListener("click", () => showView("review"));
  area.querySelector("#result-retry").addEventListener("click", () => startTest(testSession.config));
}

function renderReview() {
  const reviewIds = getReviewIds();
  const answered = questions.filter((question) => state.questions[question.id]?.seen).length;
  const mastered = questions.filter((question) => state.questions[question.id]?.streak >= 2 && state.questions[question.id]?.lastResult === "correct").length;
  document.querySelector("#review-summary").innerHTML = `<div class="review-summary-card"><strong>${reviewIds.length}</strong><span>復習候補</span></div><div class="review-summary-card"><strong>${answered}</strong><span>一度は解いた問題</span></div><div class="review-summary-card"><strong>${mastered}</strong><span>定着済みの問題</span></div>`;
  const list = document.querySelector("#review-list");
  const display = reviewIds.length ? reviewIds : questions.filter((question) => !state.questions[question.id]?.seen).map((question) => question.id);
  if (!display.length) { list.innerHTML = `<div class="empty-state"><strong>復習キューは空です。</strong><span>全問題を2回以上、正解の理由つきで解けています。</span></div>`; return; }
  list.innerHTML = display.slice(0, 20).map((id) => { const question = questionById[id]; const item = state.questions[id]; const isNew = !item?.seen; const label = isNew ? "未着手" : item.lastResult === "wrong" ? "直前に不正解" : "もう一度確認"; return `<article class="review-item"><div class="review-item-copy"><span class="review-badge ${isNew ? "is-new" : ""}">${label}</span><p class="review-item-title">${question.prompt}</p><p class="review-item-subtitle">${unitById[question.unitId].trackTitle} ／ ${unitById[question.unitId].title} ／ ${formatQuestionType(question.type)}</p></div><button class="button button-secondary" type="button" data-review-question="${question.id}">この問題を解く</button></article>`; }).join("");
  list.querySelectorAll("[data-review-question]").forEach((button) => button.addEventListener("click", () => { const questionId = button.dataset.reviewQuestion; testSession = { ids: [questionId], index: 0, score: 0, answered: 0, config: { scope: `unit:${questionById[questionId].unitId}`, count: 1, focusWeak: true } }; showView("test"); renderQuestion(); }));
}

function showView(view) {
  document.querySelectorAll("[data-view]").forEach((section) => { const active = section.dataset.view === view; section.hidden = !active; section.classList.toggle("is-visible", active); });
  document.querySelectorAll("[data-view-target]").forEach((button) => button.classList.toggle("is-active", button.dataset.viewTarget === view && button.classList.contains("nav-item")));
  if (view === "home") { updateTopIndicators(); renderHomeModules(); }
  if (view === "learn") renderLearn();
  if (view === "test" && !testSession) renderTestLanding();
  if (view === "review") renderReview();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showToast(message) {
  const toast = document.querySelector("#toast");
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("is-visible"), 2400);
}

function resetProgress() {
  if (!window.confirm("1,000問分の学習履歴と正答記録をすべてリセットしますか？")) return;
  state = defaultState(); testSession = null; saveState(); renderHomeModules(); updateTopIndicators(); renderReview(); showView("home"); showToast("進捗をリセットしました。");
}

document.querySelectorAll("[data-view-target]").forEach((button) => button.addEventListener("click", () => showView(button.dataset.viewTarget)));
document.querySelector("#reset-progress").addEventListener("click", resetProgress);
document.querySelector("#home-title").innerHTML = "知識を、<br /><em>答えられる力</em>に変える。";
document.querySelector(".hero-lede").innerHTML = "簿記3級から2級、財務三表、ROI・ROE・ROIC・EBITDA、MGまで。<br class=\"desktop-only\" />100単元・1,000問を、10問ずつ積み上げます。";
document.querySelector(".section-heading-home .section-aside").innerHTML = "1,000問を10問単位で、<br />再現できる知識へ。";

renderHomeModules();
renderLearn();
renderTestLanding();
renderReview();
updateTopIndicators();
