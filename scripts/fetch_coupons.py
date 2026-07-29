import os
import json

def main():
    # قائمة أولية تجريبية تحاكي الكوبونات والعروض لجلبها ونشرها تلقائياً
    sample_coupons = [
        {
            "id": 1,
            "store": "Amazon",
            "title": "خصم إضافي على الإلكترونيات",
            "code": "AMZ2026",
            "discount": "15%",
            "link": "https://www.admitad.com",
            "category": "إلكترونيات"
        },
        {
            "id": 2,
            "store": "Noon",
            "title": "كوبون خصم جميع المنتجات",
            "code": "NOON50",
            "discount": "50 ريال",
            "link": "https://www.linkaraby.com",
            "category": "تسوق عام"
        }
    ]

    # مسار حفظ الملف في مجلد public ليقرأه موقعك على سحابيات كلوود فلير
    output_path = 'public/coupons.json'
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(sample_coupons, f, ensure_ascii=False, indent=4)
        
    print("Coupons updated and pushed automatically!")

if __name__ == "__main__":
    main()
