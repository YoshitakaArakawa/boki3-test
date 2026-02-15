// 第3問：決算整理問題プール（8パターン、各試験で1パターン出題）
// 各パターン：残高試算表 + 決算整理事項 + 計算問題7問（各5点 = 35点）
var KESSAN_POOL = [
  // --- パターン1 ---
  {
    title: '次の決算整理前残高試算表と決算整理事項にもとづいて、各金額を計算しなさい。',
    trialBalance: [
      { account: '現金', debit: 180000, credit: 0 },
      { account: '売掛金', debit: 300000, credit: 0 },
      { account: '繰越商品', debit: 50000, credit: 0 },
      { account: '建物', debit: 1000000, credit: 0 },
      { account: '備品', debit: 400000, credit: 0 },
      { account: '買掛金', debit: 0, credit: 200000 },
      { account: '借入金', debit: 0, credit: 500000 },
      { account: '貸倒引当金', debit: 0, credit: 5000 },
      { account: '建物減価償却累計額', debit: 0, credit: 200000 },
      { account: '備品減価償却累計額', debit: 0, credit: 120000 },
      { account: '資本金', debit: 0, credit: 600000 },
      { account: '繰越利益剰余金', debit: 0, credit: 91000 },
      { account: '売上', debit: 0, credit: 900000 },
      { account: '仕入', debit: 550000, credit: 0 },
      { account: '給料', debit: 100000, credit: 0 },
      { account: '支払家賃', debit: 24000, credit: 0 },
      { account: '保険料', debit: 12000, credit: 0 }
    ],
    adjustments: [
      '① 期末商品棚卸高は ¥70,000 である。売上原価は仕入の行で計算する。',
      '② 売掛金の期末残高に対して 2% の貸倒引当金を差額補充法により設定する。',
      '③ 建物について定額法により減価償却を行う。耐用年数 20年、残存価額ゼロ。',
      '④ 備品について定額法により減価償却を行う。耐用年数 5年、残存価額ゼロ。',
      '⑤ 支払家賃のうち ¥6,000 は翌期分である。'
    ],
    questions: [
      { id: 'q3_1', label: '売上原価', answer: 530000, points: 5,
        explanation: '期首商品50,000 + 当期仕入550,000 − 期末商品70,000 = 530,000' },
      { id: 'q3_2', label: '貸倒引当金繰入額', answer: 1000, points: 5,
        explanation: '売掛金300,000 × 2% = 6,000（必要額）− 既存5,000 = 1,000' },
      { id: 'q3_3', label: '建物の減価償却費', answer: 50000, points: 5,
        explanation: '1,000,000 ÷ 20年 = 50,000' },
      { id: 'q3_4', label: '備品の減価償却費', answer: 80000, points: 5,
        explanation: '400,000 ÷ 5年 = 80,000' },
      { id: 'q3_5', label: '前払家賃の金額', answer: 6000, points: 5,
        explanation: '翌期分の支払家賃 6,000 を前払家賃に振り替えます。' },
      { id: 'q3_6', label: '当期純利益', answer: 109000, points: 5,
        explanation: '収益 900,000 − 費用合計（530,000+100,000+18,000+12,000+1,000+50,000+80,000 = 791,000）= 109,000' },
      { id: 'q3_7', label: '決算整理後の貸倒引当金残高', answer: 6000, points: 5,
        explanation: '既存 5,000 + 繰入 1,000 = 6,000' }
    ]
  },
  // --- パターン2 ---
  {
    title: '次の決算整理前残高試算表と決算整理事項にもとづいて、各金額を計算しなさい。',
    trialBalance: [
      { account: '現金', debit: 250000, credit: 0 },
      { account: '売掛金', debit: 400000, credit: 0 },
      { account: '繰越商品', debit: 80000, credit: 0 },
      { account: '備品', debit: 600000, credit: 0 },
      { account: '土地', debit: 500000, credit: 0 },
      { account: '買掛金', debit: 0, credit: 300000 },
      { account: '借入金', debit: 0, credit: 400000 },
      { account: '貸倒引当金', debit: 0, credit: 3000 },
      { account: '備品減価償却累計額', debit: 0, credit: 180000 },
      { account: '資本金', debit: 0, credit: 700000 },
      { account: '繰越利益剰余金', debit: 0, credit: 47000 },
      { account: '売上', debit: 0, credit: 1200000 },
      { account: '仕入', debit: 800000, credit: 0 },
      { account: '給料', debit: 150000, credit: 0 },
      { account: '通信費', debit: 18000, credit: 0 },
      { account: '保険料', debit: 24000, credit: 0 },
      { account: '支払利息', debit: 8000, credit: 0 }
    ],
    adjustments: [
      '① 期末商品棚卸高は ¥60,000 である。売上原価は仕入の行で計算する。',
      '② 売掛金の期末残高に対して 3% の貸倒引当金を差額補充法により設定する。',
      '③ 備品について定額法により減価償却を行う。耐用年数 8年、残存価額ゼロ。',
      '④ 保険料のうち ¥8,000 は翌期分である。'
    ],
    questions: [
      { id: 'q3_1', label: '売上原価', answer: 820000, points: 5,
        explanation: '期首商品 80,000 + 当期仕入 800,000 − 期末商品 60,000 = 820,000' },
      { id: 'q3_2', label: '貸倒引当金繰入額', answer: 9000, points: 5,
        explanation: '売掛金 400,000 × 3% = 12,000（必要額）− 既存 3,000 = 9,000' },
      { id: 'q3_3', label: '備品の減価償却費', answer: 75000, points: 5,
        explanation: '600,000 ÷ 8年 = 75,000' },
      { id: 'q3_4', label: '前払保険料の金額', answer: 8000, points: 5,
        explanation: '翌期分の保険料 8,000 を前払保険料に振り替えます。' },
      { id: 'q3_5', label: '決算整理後の繰越商品', answer: 60000, points: 5,
        explanation: '期末商品棚卸高がそのまま繰越商品の残高になります。' },
      { id: 'q3_6', label: '当期純利益', answer: 104000, points: 5,
        explanation: '収益 1,200,000 − 費用合計（820,000+150,000+18,000+16,000+8,000+9,000+75,000 = 1,096,000）= 104,000' },
      { id: 'q3_7', label: '決算整理後の貸倒引当金残高', answer: 12000, points: 5,
        explanation: '既存 3,000 + 繰入 9,000 = 12,000' }
    ]
  },
  // --- パターン3 ---
  {
    title: '次の決算整理前残高試算表と決算整理事項にもとづいて、各金額を計算しなさい。',
    trialBalance: [
      { account: '現金', debit: 150000, credit: 0 },
      { account: '当座預金', debit: 280000, credit: 0 },
      { account: '売掛金', debit: 350000, credit: 0 },
      { account: '繰越商品', debit: 60000, credit: 0 },
      { account: '建物', debit: 1200000, credit: 0 },
      { account: '車両運搬具', debit: 480000, credit: 0 },
      { account: '買掛金', debit: 0, credit: 250000 },
      { account: '借入金', debit: 0, credit: 800000 },
      { account: '貸倒引当金', debit: 0, credit: 4000 },
      { account: '建物減価償却累計額', debit: 0, credit: 240000 },
      { account: '車両減価償却累計額', debit: 0, credit: 160000 },
      { account: '資本金', debit: 0, credit: 800000 },
      { account: '繰越利益剰余金', debit: 0, credit: 106000 },
      { account: '売上', debit: 0, credit: 1400000 },
      { account: '仕入', debit: 950000, credit: 0 },
      { account: '給料', debit: 220000, credit: 0 },
      { account: '支払家賃', debit: 48000, credit: 0 },
      { account: '水道光熱費', debit: 22000, credit: 0 }
    ],
    adjustments: [
      '① 期末商品棚卸高は ¥45,000 である。売上原価は仕入の行で計算する。',
      '② 売掛金の期末残高に対して 2% の貸倒引当金を差額補充法により設定する。',
      '③ 建物について定額法により減価償却を行う。耐用年数 25年、残存価額ゼロ。',
      '④ 車両運搬具について定額法により減価償却を行う。耐用年数 6年、残存価額ゼロ。',
      '⑤ 支払家賃のうち ¥12,000 は翌期分である。'
    ],
    questions: [
      { id: 'q3_1', label: '売上原価', answer: 965000, points: 5,
        explanation: '期首商品 60,000 + 当期仕入 950,000 − 期末商品 45,000 = 965,000' },
      { id: 'q3_2', label: '貸倒引当金繰入額', answer: 3000, points: 5,
        explanation: '売掛金 350,000 × 2% = 7,000（必要額）− 既存 4,000 = 3,000' },
      { id: 'q3_3', label: '建物の減価償却費', answer: 48000, points: 5,
        explanation: '1,200,000 ÷ 25年 = 48,000' },
      { id: 'q3_4', label: '車両運搬具の減価償却費', answer: 80000, points: 5,
        explanation: '480,000 ÷ 6年 = 80,000' },
      { id: 'q3_5', label: '前払家賃の金額', answer: 12000, points: 5,
        explanation: '翌期分の支払家賃 12,000 を前払家賃に振り替えます。' },
      { id: 'q3_6', label: '当期純利益', answer: 26000, points: 5,
        explanation: '収益 1,400,000 − 費用合計（965,000+220,000+36,000+22,000+3,000+48,000+80,000 = 1,374,000）= 26,000' },
      { id: 'q3_7', label: '決算整理後の貸倒引当金残高', answer: 7000, points: 5,
        explanation: '既存 4,000 + 繰入 3,000 = 7,000' }
    ]
  },
  // --- パターン4 ---
  {
    title: '次の決算整理前残高試算表と決算整理事項にもとづいて、各金額を計算しなさい。',
    trialBalance: [
      { account: '現金', debit: 200000, credit: 0 },
      { account: '普通預金', debit: 450000, credit: 0 },
      { account: '売掛金', debit: 300000, credit: 0 },
      { account: '繰越商品', debit: 90000, credit: 0 },
      { account: '建物', debit: 900000, credit: 0 },
      { account: '備品', debit: 360000, credit: 0 },
      { account: '買掛金', debit: 0, credit: 380000 },
      { account: '借入金', debit: 0, credit: 700000 },
      { account: '貸倒引当金', debit: 0, credit: 3000 },
      { account: '建物減価償却累計額', debit: 0, credit: 270000 },
      { account: '備品減価償却累計額', debit: 0, credit: 144000 },
      { account: '資本金', debit: 0, credit: 500000 },
      { account: '繰越利益剰余金', debit: 0, credit: 163000 },
      { account: '売上', debit: 0, credit: 1100000 },
      { account: '受取手数料', debit: 0, credit: 30000 },
      { account: '仕入', debit: 720000, credit: 0 },
      { account: '給料', debit: 160000, credit: 0 },
      { account: '保険料', debit: 36000, credit: 0 },
      { account: '支払家賃', debit: 60000, credit: 0 },
      { account: '通信費', debit: 14000, credit: 0 }
    ],
    adjustments: [
      '① 期末商品棚卸高は ¥75,000 である。売上原価は仕入の行で計算する。',
      '② 売掛金の期末残高に対して 2% の貸倒引当金を差額補充法により設定する。',
      '③ 建物について定額法により減価償却を行う。耐用年数 30年、残存価額ゼロ。',
      '④ 備品について定額法により減価償却を行う。耐用年数 4年、残存価額ゼロ。',
      '⑤ 保険料のうち ¥12,000 は翌期分である。'
    ],
    questions: [
      { id: 'q3_1', label: '売上原価', answer: 735000, points: 5,
        explanation: '期首商品 90,000 + 当期仕入 720,000 − 期末商品 75,000 = 735,000' },
      { id: 'q3_2', label: '貸倒引当金繰入額', answer: 3000, points: 5,
        explanation: '売掛金 300,000 × 2% = 6,000（必要額）− 既存 3,000 = 3,000' },
      { id: 'q3_3', label: '建物の減価償却費', answer: 30000, points: 5,
        explanation: '900,000 ÷ 30年 = 30,000' },
      { id: 'q3_4', label: '備品の減価償却費', answer: 90000, points: 5,
        explanation: '360,000 ÷ 4年 = 90,000' },
      { id: 'q3_5', label: '前払保険料の金額', answer: 12000, points: 5,
        explanation: '翌期分の保険料 12,000 を前払保険料に振り替えます。' },
      { id: 'q3_6', label: '当期純利益', answer: 14000, points: 5,
        explanation: '収益（1,100,000+30,000 = 1,130,000）− 費用合計（735,000+160,000+24,000+60,000+14,000+3,000+30,000+90,000 = 1,116,000）= 14,000' },
      { id: 'q3_7', label: '決算整理後の貸倒引当金残高', answer: 6000, points: 5,
        explanation: '既存 3,000 + 繰入 3,000 = 6,000' }
    ]
  },
  // --- パターン5 ---
  {
    title: '次の決算整理前残高試算表と決算整理事項にもとづいて、各金額を計算しなさい。',
    trialBalance: [
      { account: '現金', debit: 100000, credit: 0 },
      { account: '普通預金', debit: 350000, credit: 0 },
      { account: '売掛金', debit: 300000, credit: 0 },
      { account: '繰越商品', debit: 50000, credit: 0 },
      { account: '建物', debit: 1200000, credit: 0 },
      { account: '備品', debit: 240000, credit: 0 },
      { account: '買掛金', debit: 0, credit: 200000 },
      { account: '借入金', debit: 0, credit: 400000 },
      { account: '貸倒引当金', debit: 0, credit: 4000 },
      { account: '建物減価償却累計額', debit: 0, credit: 360000 },
      { account: '備品減価償却累計額', debit: 0, credit: 96000 },
      { account: '資本金', debit: 0, credit: 800000 },
      { account: '繰越利益剰余金', debit: 0, credit: 80000 },
      { account: '売上', debit: 0, credit: 1500000 },
      { account: '仕入', debit: 950000, credit: 0 },
      { account: '給料', debit: 200000, credit: 0 },
      { account: '支払家賃', debit: 36000, credit: 0 },
      { account: '通信費', debit: 14000, credit: 0 }
    ],
    adjustments: [
      '① 期末商品棚卸高は ¥65,000 である。売上原価は仕入の行で計算する。',
      '② 売掛金の期末残高に対して 2% の貸倒引当金を差額補充法により設定する。',
      '③ 建物について定額法により減価償却を行う。耐用年数 30年、残存価額ゼロ。',
      '④ 備品について定額法により減価償却を行う。耐用年数 6年、残存価額ゼロ。',
      '⑤ 借入金の利息 ¥4,000 が未払いである。'
    ],
    questions: [
      { id: 'q3_1', label: '売上原価', answer: 935000, points: 5,
        explanation: '期首商品 50,000 + 当期仕入 950,000 − 期末商品 65,000 = 935,000' },
      { id: 'q3_2', label: '貸倒引当金繰入額', answer: 2000, points: 5,
        explanation: '売掛金 300,000 × 2% = 6,000（必要額）− 既存 4,000 = 2,000' },
      { id: 'q3_3', label: '建物の減価償却費', answer: 40000, points: 5,
        explanation: '1,200,000 ÷ 30年 = 40,000' },
      { id: 'q3_4', label: '備品の減価償却費', answer: 40000, points: 5,
        explanation: '240,000 ÷ 6年 = 40,000' },
      { id: 'q3_5', label: '未払利息の金額', answer: 4000, points: 5,
        explanation: '借入金の利息 4,000 が未払いのため、支払利息と未払利息を計上します。' },
      { id: 'q3_6', label: '当期純利益', answer: 229000, points: 5,
        explanation: '収益 1,500,000 − 費用合計（935,000+200,000+36,000+14,000+2,000+40,000+40,000+4,000 = 1,271,000）= 229,000' },
      { id: 'q3_7', label: '決算整理後の貸倒引当金残高', answer: 6000, points: 5,
        explanation: '既存 4,000 + 繰入 2,000 = 6,000' }
    ]
  },
  // --- パターン6 ---
  {
    title: '次の決算整理前残高試算表と決算整理事項にもとづいて、各金額を計算しなさい。',
    trialBalance: [
      { account: '現金', debit: 160000, credit: 0 },
      { account: '当座預金', debit: 340000, credit: 0 },
      { account: '売掛金', debit: 400000, credit: 0 },
      { account: '繰越商品', debit: 70000, credit: 0 },
      { account: '備品', debit: 500000, credit: 0 },
      { account: '土地', debit: 800000, credit: 0 },
      { account: '買掛金', debit: 0, credit: 260000 },
      { account: '借入金', debit: 0, credit: 500000 },
      { account: '貸倒引当金', debit: 0, credit: 4000 },
      { account: '備品減価償却累計額', debit: 0, credit: 100000 },
      { account: '資本金', debit: 0, credit: 900000 },
      { account: '繰越利益剰余金', debit: 0, credit: 96000 },
      { account: '売上', debit: 0, credit: 1500000 },
      { account: '受取家賃', debit: 0, credit: 60000 },
      { account: '仕入', debit: 900000, credit: 0 },
      { account: '給料', debit: 200000, credit: 0 },
      { account: '保険料', debit: 30000, credit: 0 },
      { account: '支払利息', debit: 20000, credit: 0 }
    ],
    adjustments: [
      '① 期末商品棚卸高は ¥80,000 である。売上原価は仕入の行で計算する。',
      '② 売掛金の期末残高に対して 2% の貸倒引当金を差額補充法により設定する。',
      '③ 備品について定額法により減価償却を行う。耐用年数 10年、残存価額ゼロ。',
      '④ 保険料のうち ¥10,000 は翌期分である。',
      '⑤ 受取家賃のうち ¥15,000 は翌期分である。'
    ],
    questions: [
      { id: 'q3_1', label: '売上原価', answer: 890000, points: 5,
        explanation: '期首商品 70,000 + 当期仕入 900,000 − 期末商品 80,000 = 890,000' },
      { id: 'q3_2', label: '貸倒引当金繰入額', answer: 4000, points: 5,
        explanation: '売掛金 400,000 × 2% = 8,000（必要額）− 既存 4,000 = 4,000' },
      { id: 'q3_3', label: '備品の減価償却費', answer: 50000, points: 5,
        explanation: '500,000 ÷ 10年 = 50,000' },
      { id: 'q3_4', label: '前払保険料の金額', answer: 10000, points: 5,
        explanation: '翌期分の保険料 10,000 を前払保険料に振り替えます。' },
      { id: 'q3_5', label: '前受家賃の金額', answer: 15000, points: 5,
        explanation: '翌期分の受取家賃 15,000 を前受家賃に振り替えます。収益の繰延べです。' },
      { id: 'q3_6', label: '当期純利益', answer: 361000, points: 5,
        explanation: '収益（1,500,000+45,000 = 1,545,000）− 費用合計（890,000+200,000+20,000+20,000+4,000+50,000 = 1,184,000）= 361,000' },
      { id: 'q3_7', label: '決算整理後の貸倒引当金残高', answer: 8000, points: 5,
        explanation: '既存 4,000 + 繰入 4,000 = 8,000' }
    ]
  },
  // --- パターン7 ---
  {
    title: '次の決算整理前残高試算表と決算整理事項にもとづいて、各金額を計算しなさい。',
    trialBalance: [
      { account: '現金', debit: 140000, credit: 0 },
      { account: '普通預金', debit: 500000, credit: 0 },
      { account: '売掛金', debit: 250000, credit: 0 },
      { account: '繰越商品', debit: 45000, credit: 0 },
      { account: '貸付金', debit: 200000, credit: 0 },
      { account: '建物', debit: 900000, credit: 0 },
      { account: '買掛金', debit: 0, credit: 180000 },
      { account: '借入金', debit: 0, credit: 300000 },
      { account: '貸倒引当金', debit: 0, credit: 3000 },
      { account: '建物減価償却累計額', debit: 0, credit: 180000 },
      { account: '資本金', debit: 0, credit: 800000 },
      { account: '繰越利益剰余金', debit: 0, credit: 62000 },
      { account: '売上', debit: 0, credit: 1400000 },
      { account: '受取手数料', debit: 0, credit: 40000 },
      { account: '仕入', debit: 780000, credit: 0 },
      { account: '給料', debit: 110000, credit: 0 },
      { account: '消耗品費', debit: 25000, credit: 0 },
      { account: '支払家賃', debit: 15000, credit: 0 }
    ],
    adjustments: [
      '① 期末商品棚卸高は ¥55,000 である。売上原価は仕入の行で計算する。',
      '② 売掛金の期末残高に対して 2% の貸倒引当金を差額補充法により設定する。',
      '③ 建物について定額法により減価償却を行う。耐用年数 25年、残存価額ゼロ。',
      '④ 消耗品の期末未使用分が ¥7,000 ある。',
      '⑤ 貸付金の利息 ¥3,000 が未収である。'
    ],
    questions: [
      { id: 'q3_1', label: '売上原価', answer: 770000, points: 5,
        explanation: '期首商品 45,000 + 当期仕入 780,000 − 期末商品 55,000 = 770,000' },
      { id: 'q3_2', label: '貸倒引当金繰入額', answer: 2000, points: 5,
        explanation: '売掛金 250,000 × 2% = 5,000（必要額）− 既存 3,000 = 2,000' },
      { id: 'q3_3', label: '建物の減価償却費', answer: 36000, points: 5,
        explanation: '900,000 ÷ 25年 = 36,000' },
      { id: 'q3_4', label: '消耗品の金額', answer: 7000, points: 5,
        explanation: '消耗品の未使用分 7,000 を消耗品費から消耗品（資産）に振り替えます。' },
      { id: 'q3_5', label: '未収利息の金額', answer: 3000, points: 5,
        explanation: '貸付金の利息 3,000 が未収のため、未収利息と受取利息を計上します。収益の見越しです。' },
      { id: 'q3_6', label: '当期純利益', answer: 492000, points: 5,
        explanation: '収益（1,400,000+40,000+3,000 = 1,443,000）− 費用合計（770,000+110,000+18,000+15,000+2,000+36,000 = 951,000）= 492,000' },
      { id: 'q3_7', label: '決算整理後の貸倒引当金残高', answer: 5000, points: 5,
        explanation: '既存 3,000 + 繰入 2,000 = 5,000' }
    ]
  },
  // --- パターン8 ---
  {
    title: '次の決算整理前残高試算表と決算整理事項にもとづいて、各金額を計算しなさい。',
    trialBalance: [
      { account: '現金', debit: 190000, credit: 0 },
      { account: '普通預金', debit: 450000, credit: 0 },
      { account: '売掛金', debit: 350000, credit: 0 },
      { account: '繰越商品', debit: 85000, credit: 0 },
      { account: '建物', debit: 1800000, credit: 0 },
      { account: '車両運搬具', debit: 360000, credit: 0 },
      { account: '買掛金', debit: 0, credit: 340000 },
      { account: '借入金', debit: 0, credit: 900000 },
      { account: '貸倒引当金', debit: 0, credit: 6000 },
      { account: '建物減価償却累計額', debit: 0, credit: 360000 },
      { account: '車両減価償却累計額', debit: 0, credit: 120000 },
      { account: '資本金', debit: 0, credit: 1000000 },
      { account: '繰越利益剰余金', debit: 0, credit: 99000 },
      { account: '売上', debit: 0, credit: 1800000 },
      { account: '仕入', debit: 1150000, credit: 0 },
      { account: '給料', debit: 180000, credit: 0 },
      { account: '保険料', debit: 48000, credit: 0 },
      { account: '支払利息', debit: 12000, credit: 0 }
    ],
    adjustments: [
      '① 期末商品棚卸高は ¥70,000 である。売上原価は仕入の行で計算する。',
      '② 売掛金の期末残高に対して 2% の貸倒引当金を差額補充法により設定する。',
      '③ 建物について定額法により減価償却を行う。耐用年数 30年、残存価額ゼロ。',
      '④ 車両運搬具について定額法により減価償却を行う。耐用年数 4年、残存価額ゼロ。',
      '⑤ 保険料のうち ¥16,000 は翌期分である。'
    ],
    questions: [
      { id: 'q3_1', label: '売上原価', answer: 1165000, points: 5,
        explanation: '期首商品 85,000 + 当期仕入 1,150,000 − 期末商品 70,000 = 1,165,000' },
      { id: 'q3_2', label: '貸倒引当金繰入額', answer: 1000, points: 5,
        explanation: '売掛金 350,000 × 2% = 7,000（必要額）− 既存 6,000 = 1,000' },
      { id: 'q3_3', label: '建物の減価償却費', answer: 60000, points: 5,
        explanation: '1,800,000 ÷ 30年 = 60,000' },
      { id: 'q3_4', label: '車両運搬具の減価償却費', answer: 90000, points: 5,
        explanation: '360,000 ÷ 4年 = 90,000' },
      { id: 'q3_5', label: '前払保険料の金額', answer: 16000, points: 5,
        explanation: '翌期分の保険料 16,000 を前払保険料に振り替えます。' },
      { id: 'q3_6', label: '当期純利益', answer: 260000, points: 5,
        explanation: '収益 1,800,000 − 費用合計（1,165,000+180,000+32,000+12,000+1,000+60,000+90,000 = 1,540,000）= 260,000' },
      { id: 'q3_7', label: '決算整理後の貸倒引当金残高', answer: 7000, points: 5,
        explanation: '既存 6,000 + 繰入 1,000 = 7,000' }
    ]
  }
];
