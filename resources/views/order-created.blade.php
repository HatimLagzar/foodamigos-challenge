<p>New Order</p>

<p>Total: {{ $order->total }}</p>
<p>Notes: {{ $order->notes }}</p>
<p>Creation Datetime: {{ $order->created_at }}</p>

<h1>User Information</h1>
<p>name: {{ $user->name }}</p>
<p>Phone: {{ $user->phone_number }}</p>
<p>Address: {{ $user->address }}</p>

@foreach($order->items as $item)
    <p>Name: {{ $item->product->name }}</p>
    <p>Qty: {{ $item->quantity }}</p>
@endforeach
