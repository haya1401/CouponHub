import os
import json

def main():
    print("Fetching coupons simulation...")
    
    # يمكنك إبقاء قائمة فارغة حالياً لكي لا يحدث أي خطأ في واجهة الموقع
    all_coupons = []

    output_path = 'public/coupons.json'
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(all_coupons, f, ensure_ascii=False, indent=4)
        
    print("Safe state restored!")

if __name__ == "__main__":
    main()
