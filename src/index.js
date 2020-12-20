import ReactDOM from 'react-dom'
import React, { useEffect, useState } from 'react'
import { Canvas } from 'react-three-fiber'
import { useSpring, a } from 'react-spring/three'
import './styles.css'

// 使用する色の配列
const colors = ['#D72638', '#3F88C5', '#F49D37', '#140F2D', '#F22B29']

/**
 * 3.メインコンテンツ
 * 四角の平面が、配列の色へ変わるのを繰り返す
 */
function Content() {
  const [page, setPage] = useState(0)
  // 背景色
  const { color } = useSpring({ color: colors[page] })
  useEffect(
    () =>
      // 一定時間ごとに処理をおこなう
      void setInterval(
        () => {
          setPage((i) => (++i >= colors.length ? 0 : i))
        },
        // 3秒ごとに実行
        2000
      ),
    //第2引数を空要素にすることにより
    //マウント・アンマウント時のみ第１引数の関数を実行
    []
  )

  return (
    <>
      <mesh>
        <planeGeometry attach="geometry" args={[100, 100]} />
        <a.meshPhongMaterial attach="material" color={color} depthTest={false} />
      </mesh>
    </>
  )
}

/**
 * 2.ライトの追加
 */
function Lights() {
  return (
    <group>
      <pointLight intensity={0.3} />
      <ambientLight intensity={2} />
      <spotLight
        // このオブジェクトから影を発生させる
        castShadow
        intensity={0.2}
        angle={Math.PI / 7}
        position={[150, 150, 250]}
        // ターゲットからの光の減衰
        penumbra={1}
        // 影の細かさ
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
    </group>
  )
}

/**
 * 1.プログラムのスタート地点
 */
export default function App() {
  return (
    // 影の描画を有効 カメラの位置 視野角
    <Canvas camera={{ position: [0, 0, 100], fov: 100 }}>
      {/* function Lights() */}
      <Lights />
      {/* function Content() */}
      <Content />
    </Canvas>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
