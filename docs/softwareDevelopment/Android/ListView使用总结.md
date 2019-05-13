#### 前言
>ListView
#### 要素
+ 子项布局
+ ListView布局
+ 数据
+ 适配器
#### 使用总结
举个例子来说明使用（一个新闻app）
+ 子项布局
```
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="100dp"
    android:background="@color/color_White">
    <RelativeLayout
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:layout_margin="10dp">
        <ImageView
            android:id="@+id/title_pic"
            android:layout_width="80dp"
            android:layout_height="60dp"
            android:layout_centerVertical="true"
            android:layout_alignParentRight="true"
            android:scaleType="centerCrop"/>
        <TextView
            android:id="@+id/title_text"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:textSize="16sp"
            android:layout_marginRight="10dp"
            android:layout_alignTop="@+id/title_pic"
            android:layout_alignParentLeft="true"
            android:layout_toLeftOf="@+id/title_pic"
            />
        <TextView
            android:id="@+id/descr_text"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:textSize="8sp"
            android:layout_marginRight="10dp"
            android:layout_alignBottom="@+id/title_pic"
            android:layout_alignParentLeft="true"
            />
    </RelativeLayout>
</RelativeLayout>
```
+ ListView控件
```
<ListView
   android:id="@+id/list_view"
   android:layout_width="match_parent"
   android:layout_height="match_parent"
   android:dividerHeight="1dp"
   android:divider="@color/color_Background"/>
```  

+ 适配器
```
public class TitleAdapter extends ArrayAdapter<Title> {
    private int resourceId;

    public TitleAdapter(Context context, int resource, List<Title> objects) {
        super(context, resource, objects);
        resourceId = resource;
    }

    @NonNull
    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        Title title = getItem(position);
        View view;
        ViewHolder viewHolder;

        //对ListView进行优化
        if (convertView == null){
            view = LayoutInflater.from(getContext()).inflate(resourceId,parent,false);
            viewHolder = new ViewHolder();
            viewHolder.titleText = (TextView)view.findViewById(R.id.title_text);
            viewHolder.titlePic = (ImageView) view.findViewById(R.id.title_pic);
            viewHolder.titleDescr = (TextView)view.findViewById(R.id.descr_text);
            view.setTag(viewHolder);
        }else{
            view = convertView;
            viewHolder = (ViewHolder) view.getTag();
        }

        Glide.with(getContext()).load(title.getImageUrl()).into(viewHolder.titlePic);
        viewHolder.titleText.setText(title.getTitle());
        viewHolder.titleDescr.setText(title.getDescr());

        return view;

    }

    public class ViewHolder{
        TextView titleText;
        TextView titleDescr;
        ImageView titlePic;
    }
}
```
+ 使用
```
TitleAdapter adapter = new TitleAdapter(this, R.layout.list_view_item, titleList);
listView.setAdapter(adapter);
```        
+ ListView点击事件
```
listView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            Intent intent = new Intent(MainActivity.this, ContentActivity.class);

            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                Title title = titleList.get(position);
                intent.putExtra("title", actionBar.getTitle());
                intent.putExtra("uri", title.getUri());
                startActivity(intent);
            }
        });
```       
