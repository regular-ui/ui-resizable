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

### 限制句柄

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
<resizable handleType="square">
    <div class="m-panel m-panel-info">
        <div class="panel_bd">将鼠标移到Panel边缘处，尝试调整大小。</div>
    </div>
</resizable>
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
