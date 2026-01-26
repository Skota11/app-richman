"use client";
import { Divider, Link } from "@heroui/react";

export default function Home() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-4">大富豪オンライン</h1>
      <p className="text-lg mb-8">
        友達や家族と一緒に大富豪をオンラインで楽しもう！シンプルなルールで誰でもすぐに遊べます。
      </p>
      <div className="relative w-full">
        <Link size="lg" href="/play">ゲームを始める</Link>
      </div>
      <Divider className="mt-8 mb-12" />
      <div>
        <h2 className="text-2xl font-semibold mb-4">遊び方</h2>
        <div className="mb-8">
          <div className="space-y-6">
            <section>
              <h3 className="text-xl font-bold mb-2">🃏 ゲーム説明</h3>
              <p>
                配られたカードを順番に場に出していき、誰よりも早く手札をなくすことが目標です。<br />
                早く上がった順に「大富豪」「富豪」「平民」「貧民」「大貧民」という階級がつきます。
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold mb-2">💪 カードの強さ</h3>
              <p className="mb-2">
                基本的には、数字の強さは以下の通りです。
                ゲームでは自動的に手札が強い順にソートされます。
              </p>
              <div className="bg-gray-100 p-4 rounded-lg text-center dark:bg-gray-800 flex items-center justify-center gap-x-6">
                <span className="text-sm">弱い</span>
                <div className="text-lg font-bold my-1">
                  3 &lt; 4 &lt; 5 ... Q &lt; K &lt; A &lt; 2 &lt;&lt; Joker
                </div>
                <span className="text-sm">強い</span>
              </div>
              <p className="mt-2 text-sm text-gray-500">
                ※「革命」が起きると強さが逆転します（3が最強、2が最弱）。Jokerは常に最強クラスです。
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold mb-2">🔄 ゲームの流れ</h3>
              <ol className="list-decimal list-inside space-y-2 ml-2">
                <li>カードが全員に配られます。</li>
                <li>前のゲームの結果がある場合は、カード交換を行います。（大富豪 ⇄ 大貧民 など）</li>
                <li>親からカードを出していきます。（1枚、ペア、階段など好きな出し方ができます）</li>
                <li>
                  次の人は、場に出ているカードと<span className="font-bold">同じ枚数・同じ出し方</span>で、より<span className="font-bold text-red-500">強いカード</span>を出さなければなりません。<br />
                  <span className="text-sm text-gray-500 ml-4">（例：前の人がペア（2枚）なら、自分もより強いペア（2枚）を出します）</span><br />
                  出せない、または出したくない場合は「パス」ができます。
                </li>
                <li>全員がパスすると場が流れ、最後にカードを出した人が親となり、好きなカードから再開できます。</li>
                <li>手札がなくなった人から順に抜け、全員の順位が決まるまで続けます。</li>
              </ol>
            </section>

            <section>
              <h3 className="text-xl font-bold mb-2">⚡ このゲームの主なルール</h3>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li><strong>革命</strong>: 同数字4枚のカードを出すと発生。強さが逆転します。</li>
                <li><strong>8切り</strong>: 8を含むカードを出すと(階段は不可)、強制的に場を流して自分の番にできます。</li>
                <li><strong>スペードの3</strong>: ジョーカーが単体で出された時だけ出せる、ジョーカー封じのカードです。</li>
                <li><strong>階段</strong>: 連続した数字を3枚まとめて出せます（例：♠3, ♠4, ♠5）。</li>
                <li><strong>都落ち</strong>: 大富豪だった人がトップであがれなかった場合、強制的に大貧民になります。</li>
                <li><strong>反則あがり</strong>: ジョーカーや、8などを最後に出してあがることはできません。</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
    );
}
