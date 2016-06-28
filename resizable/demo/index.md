## 示例
### 基本形式

<div class="m-example"></div>

```xml
<resizable>
    <div class="m-panel m-panel-info">
        <div class="panel_bd">将鼠标移到Panel边缘处，尝试调整大小。</div>
    </div>
</resizable>
```

```css
.m-panel {box-sizing: border-box; width: 100%; height: 100%;}
```

### 设置句柄

<div class="m-example"></div>

```xml
<resizable handles={['bottom', 'right', 'bottomright']}>
    <div class="m-panel m-panel-info">
        <div class="panel_bd">将鼠标移到Panel边缘处，尝试调整大小。</div>
    </div>
</resizable>
```

### 句柄类型

<div class="m-example"></div>

```xml
<div class="g-row">
    <div class="g-col g-col-6">
        <resizable handleType="square">
            <div class="m-panel m-panel-info">
                <div class="panel_bd">将鼠标移到Panel边缘处，尝试调整大小。</div>
            </div>
        </resizable>
    </div>
    <div class="g-col g-col-6">
        <resizable handleType="debug">
            <div class="m-panel m-panel-info">
                <div class="panel_bd">将鼠标移到Panel边缘处，尝试调整大小。</div>
            </div>
        </resizable>
    </div>
</div>
```

### 最小值和最大值

<div class="m-example"></div>

```xml
<resizable minWidth="200" minHeight="100" maxWidth="300" maxHeight="200">
    <div class="m-panel m-panel-info">
        <div class="panel_bd">将鼠标移到Panel边缘处，尝试调整大小。</div>
    </div>
</resizable>
```
